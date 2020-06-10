import { Injectable } from '@nestjs/common';
import { ResourceService } from '../../../core/services/resource.service';
import { VisitRetentionRepository } from '../../../../infrastructure/common/repositories/visitRetention.repository';
import { VisitRetentionDto } from '../../dtos/dtos/visitRetention/visitRetention.dto';
import { VisitRetentionUpdate } from '../../dtos/inputs/visitRetention/visitRetention.update';
import { FLAG_RETENTION } from '../../../../constants/modules/enums';
import { UserService } from '../user/user.service';
import { RetentionSettingsService } from '../settings/retention-settings.service';
import { Field } from 'type-graphql';
import { RetentionServiceSettingDto } from '../../dtos/dtos/settings/retention/treatment/service/retention-service-setting.dto';
import { RetentionRequestSettingDto } from '../../dtos/dtos/settings/retention/treatment/request/retention-request-setting.dto';
import { RetentionAmountSettingDto } from '../../dtos/dtos/settings/retention/treatment/amount/retention-amount-setting.dto';
import { RetentionDirectorySettingDto } from '../../dtos/dtos/settings/retention/treatment/directory/retention-directory-setting.dto';
import { RetentionSettingDto } from '../../dtos/dtos/settings/retention/retention-setting.dto';
import { regexFormatNumber, regexPhone } from '../../../../constants/modules/rules';
import { formatCurrency, formatPhoneNumber } from '../../../../constants/utils';

export interface IParserResponse {
    classification: 'availability' | 'treatment';
    response: IParserAvailabilityResponse | IParserTreatmentResponse;
}

export interface IParserAvailabilityResponse {
    available: boolean;
}

export interface IParserTreatmentResponse {
    readonly services?: string;
    readonly request: string;
    readonly amount: string | number;
    readonly directory: string;
    readonly tip: string | number;
    readonly client: {
        name?: string;
        phone?: string;
    };
}

@Injectable()
export class VisitRetentionService extends ResourceService<VisitRetentionDto> {
    constructor(
      readonly repository: VisitRetentionRepository,
      readonly userService: UserService,
      readonly settingService: RetentionSettingsService,
    ) {
        super(repository);
    }
    async updateFlag(id: string, flag: FLAG_RETENTION) {
        const prev = await this.repository.getOne(id) as { flag: FLAG_RETENTION, userId: string };
        if (prev.flag !== flag) {
            await this.userService.updateRetention(prev.userId,
              { important: prev.flag === FLAG_RETENTION.NORMAL ? 1 : flag === FLAG_RETENTION.NORMAL ? -1 : 0 });
        }
    }
    async parser(text: string): Promise<IParserResponse> {
        const processedText = text.trim().replace(/( )+/, ' ');
        if (!processedText) { return null; }
        const setting = await this.settingService.findOne({});
        if (!setting) { return null; }
        const available = setting.availability.available.match.some(x => x.toLowerCase() === processedText.toLowerCase());
        const unavailable = setting.availability.unavailable.match.some(x => x.toLowerCase() === processedText.toLowerCase());
        if (available || unavailable) {
            return {
                classification: 'availability',
                response: {
                    available,
                },
            };
        }
        return {
            classification: 'treatment',
            response: this.parserTreatment(processedText, setting),
        };
    }
    parserTreatment(text: string, setting: RetentionSettingDto): IParserTreatmentResponse {
        const extractPhone = () => {
            const result = text.match(regexPhone);
            if (result && result.length) {
                text = text.replace(regexPhone, '').replace(/( )+/, ' ');
                return formatPhoneNumber(result.slice(1, 5).join(''));
            }
            return undefined;
        };
        const extractDirectory = () => {
            let result = setting.treatment.directory.default;
            for (const x of setting.treatment.directory.setting) {
                const replaced = text.replace(this.buildRegex(x.match), '');
                if (replaced !== text) {
                    result = x.directoryId;
                    text = replaced.trim().replace(/( )+/, ' ');
                    break;
                }
            }
            return result;
        };
        const extractService = () => {
            let result = setting.treatment.services.default;
            for (const x of setting.treatment.services.setting) {
                const replaced = text.replace(this.buildRegex(x.match), '');
                if (replaced !== text) {
                    result = x.serviceId;
                    text = replaced.trim().replace(/( )+/, ' ');
                    break;
                }
            }
            return result;
        };
        const extractRequest = () => {
            let result = FLAG_RETENTION.NORMAL;
            let replaced = text.replace(this.buildRegex(setting.treatment.request.personalMatch), '');
            if (replaced !== text) {
                result = FLAG_RETENTION.PERSONAL;
                text = replaced.trim().replace(/( )+/, ' ');
                return result;
            }
            replaced = text.replace(this.buildRegex(setting.treatment.request.requestMatch), '');
            if (replaced !== text) {
                result = FLAG_RETENTION.REQUEST;
                text = replaced.trim().replace(/( )+/, ' ');
                return result;
            }
            return result;
        };
        const extractAmount = () => {
            const [ defaultAmount, defaultTip ] = [ setting.treatment.amount.default, setting.treatment.tip.default ];
            let resultAmount;
            let resultTip;
            const extractTypeString = (field: 'amount' | 'tip') => {
                for (const x of setting.treatment[field].setting.filter(v => v.type === 'string')) {
                    const replaced = text.replace(this.buildRegex(x.match), '');
                    if (replaced !== text) {
                        text = replaced.trim().replace(/( )+/, ' ');
                        return x.display;
                    }
                }
                return undefined;
            };
            resultAmount = extractTypeString('amount');
            resultTip = extractTypeString('tip');
            if (!resultAmount || !resultTip) {
                const regexAmount = new RegExp(setting.treatment.amount.setting
                    .filter(v => v.type === 'number')
                    .map(x => x.match.sort((a, b) => Number(a.length < b.length)).join('|'))
                    .join('|'), 'i')
                ;
                const regexTip = new RegExp(setting.treatment.tip.setting
                  .filter(v => v.type === 'number')
                  .map(x => x.match.sort((a, b) => Number(a.length < b.length)).join('|'))
                  .join('|'), 'i')
                ;
                const idxAmount = !resultAmount ? text.search(regexAmount) : -1;
                const idxTip = !resultTip ? text.search(regexTip) : -1;
                if (idxTip > idxAmount) {
                    resultTip = extractAmountNumber(regexTip);
                    resultAmount = idxAmount >= 0 ? extractAmountNumber(regexAmount, false) : resultAmount;
                } else if (idxAmount > idxTip) {
                    resultAmount = extractAmountNumber(regexAmount, false);
                    resultTip = idxTip >= 0 ? extractAmountNumber(regexTip) : resultTip;
                }
            }
            return {
                amount: resultAmount ?? defaultAmount,
                tip: resultTip ?? defaultTip,
            };
        };
        const extractAmountNumber = (regex: RegExp, onlyValue = true) => {
            let mixRegex = new RegExp(`(${regex.source})( )+(${regexFormatNumber.source})`, 'i');
            let match = text.match(mixRegex);
            const getResult = (matchResult: string) => {
                const fix = matchResult.replace(/(\$ )|(\$)|( \$)/, ' ').trim().replace(/( )+/, ' ');
                let value = fix.replace(regex, '').trim();
                const type = fix.replace(value, '').trim();
                value = formatCurrency(Number.parseFloat(value));
                return onlyValue ? value : `${type} ${value}`;
            };
            if (!!match && match.length) {
                text = text.replace(mixRegex, '').trim().replace(/( )+/, ' ');
                return getResult(match[0]);
            }
            mixRegex = new RegExp(`(${regexFormatNumber.source})( )+(${regex.source})`, 'i');
            match = text.match(mixRegex);
            if (!!match && match.length) {
                text = text.replace(mixRegex, '').trim().replace(/( )+/, ' ');
                return getResult(match[0]);
            }
            match = text.match(regex);
            text = text.replace(regex, '').trim().replace(/( )+/, ' ');
            return match && match.length && !onlyValue ? match[0] : undefined;
        };
        const extractOtherInfo = () => {
            text = text.replace(this.buildRegex(setting.treatment.otherInfo), '');
        };
        const phone = extractPhone();
        const { amount, tip } = extractAmount();
        const directory = extractDirectory();
        const services = extractService();
        const request = extractRequest();
        extractOtherInfo();
        const name = text.trim().replace(/( )+/, ' ');
        return {
            amount,
            tip,
            directory,
            services,
            request,
            client: {
                name,
                phone,
            },
        } as IParserTreatmentResponse;
    }
    private buildRegex(matches: string[]) {
        return new RegExp(matches.sort((a, b) => Number(a.length < b.length)).join('|'), 'i');
    }
}
