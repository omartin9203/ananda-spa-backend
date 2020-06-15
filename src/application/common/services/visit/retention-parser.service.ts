import { Injectable } from '@nestjs/common';
import { VisitRetentionDto } from '../../dtos/dtos/visitRetention/visitRetention.dto';
import { RetentionSettingDto } from '../../dtos/dtos/settings/retention/retention-setting.dto';
import { regexFormatNumber, regexPhone } from '../../../../constants/modules/rules';
import { FLAG_RETENTION } from '../../../../constants/modules/enums';
import { RetentionSettingsService } from '../settings/retention-settings.service';
import { formatCurrency, formatPhoneNumber } from '../../../../constants/utils';

export interface IParserResponse {
  classification: 'availability' | 'treatment';
  response: IParserAvailabilityResponse | IParserTreatmentResponse;
}

export interface IParserAvailabilityResponse {
  available: boolean;
}

export interface IParserTreatmentResponse {
  readonly serviceId?: string;
  readonly flag: FLAG_RETENTION;
  readonly amount: string;
  readonly directoryId: string;
  readonly tip: string;
  readonly client: {
    name: string;
    phone?: string;
  };
  readonly otherInfo: string[];
}

@Injectable()
export class RetentionParserService {
  constructor(
    readonly settingService: RetentionSettingsService,
  ) {}

  async buildSummary(entity: VisitRetentionDto) {
    try {
      const setting: RetentionSettingDto = await this.settingService.findOne({});
      if (!setting) {
        return {
          success: false,
          error: 'Error in fetch setting.',
        };
      }
      const directory = setting.treatment.directory.setting
        .find(x => x.directoryId.toString() === entity.directoryId.toString())?.match.find(x => x);
      const service = setting.treatment.services.setting.find(x => x.serviceId.toString() === entity.serviceId.toString())?.match.find(x => x);
      const amount = entity.amount?.match(regexFormatNumber)?.length
        ? entity.amount
        : setting.treatment.amount.setting.find(x => x.display === entity.amount)?.match.find(x => x);
      const tip = entity.tip?.match(regexFormatNumber)?.length
        ? [setting.treatment.tip.setting.find(x => x.type === 'number')?.match.find(x => x) ?? 'tip', entity.tip].join(' ')
        : setting.treatment.tip.setting.find(x => x.display === entity.tip)?.match.find(x => x);
      const flag = entity.flag === FLAG_RETENTION.NORMAL
        ? undefined
        : setting.treatment.request[entity.flag === FLAG_RETENTION.REQUEST ? 'requestMatch' : 'personalMatch'].find(x => x);
      const otherInfo = entity.otherInfo.join(' ');
      const summary = [entity.client.name, entity.client.phone, directory, service, amount, tip, flag, otherInfo].filter(x => !!x).join(' ');
      return {
        success: true,
        data: summary,
      };
    } catch (e) {
      return {
        success: false,
        error: e.toString(),
      };
    }
  }

  async parserSummary(text: string): Promise<IParserResponse> {
    const processedText = text.trim().replace(/( )+/, ' ');
    if (!processedText) { return null; }
    const setting = await this.settingService.findOne({});
    if (!setting) { return null; }
    const availability = this.parserAvailability(processedText, setting);
    return {
      classification: availability ? 'availability' : 'treatment',
      response: availability ?? this.parserTreatment(processedText, setting),
    };
  }
  parserAvailability(text: string, setting: RetentionSettingDto): IParserAvailabilityResponse | null {
    const available = setting.availability.available.match.some(x => x.toLowerCase() === text.toLowerCase());
    const unavailable = setting.availability.unavailable.match.some(x => x.toLowerCase() === text.toLowerCase());
    return !available && !unavailable ? null : {
      available,
    };
  }
  parserTreatment(text: string, setting: RetentionSettingDto): IParserTreatmentResponse {
    const fixText = (v: string) => v.trim().replace(/( )+/g, ' ');
    const extractPhone = () => {
      const result = text.match(regexPhone);
      if (result && result.length) {
        text = fixText(text.replace(regexPhone, ''));
        return formatPhoneNumber(result.slice(1, 5).join(''), {type: 'domestic', separator: '.'})
          .replace(/\./g, '');
      }
      return undefined;
    };
    const extractDirectory = () => {
      let result = setting.treatment.directory.default;
      for (const x of setting.treatment.directory.setting) {
        const replaced = text.replace(this.buildRegex(x.match), '');
        if (replaced !== text) {
          result = x.directoryId;
          text = fixText(replaced);
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
          text = fixText(replaced);
          break;
        }
      }
      const a: string = result;
      return result;
    };
    const extractFlag = () => {
      let result = FLAG_RETENTION.NORMAL;
      let replaced = text.replace(this.buildRegex(setting.treatment.request.personalMatch), '');
      if (replaced !== text) {
        result = FLAG_RETENTION.PERSONAL;
        text = fixText(replaced);
        return result;
      }
      replaced = text.replace(this.buildRegex(setting.treatment.request.requestMatch), '');
      if (replaced !== text) {
        result = FLAG_RETENTION.REQUEST;
        text = fixText(replaced);
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
            text = fixText(replaced);
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
      let mixRegex = new RegExp(`(${regex.source})( )*(${regexFormatNumber.source})`, 'i');
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
      text = fixText(text.replace(regex, ''));
      return match && match.length && !onlyValue ? match[0] : undefined;
    };
    const extractOtherInfo = () => {
      const regex = this.buildRegex(setting.treatment.otherInfo, 'g');
      const result = text.match(regex);
      text = fixText(text.replace(regex, ''));
      return result;
    };
    const phone = extractPhone();
    const { amount, tip } = extractAmount();
    const directoryId = extractDirectory();
    const serviceId = extractService();
    const flag = extractFlag();
    const otherInfo = extractOtherInfo();
    const name = fixText(text);
    return {
      amount,
      tip,
      directoryId,
      serviceId,
      flag,
      client: {
        name,
        phone,
      },
      otherInfo,
    } as IParserTreatmentResponse;
  }
  private buildRegex(matches: string[], flags = 'i') {
    const regExp = new RegExp(matches.sort((a, b) => Number(a.length < b.length)).map(x => `\\b${x}\\b`).join('|'), flags);
    return regExp;
  }
}
