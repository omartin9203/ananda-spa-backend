import {AccreditedType, ReviewDto} from '../../dtos/dtos/review/review.dto';
import { Injectable, NotAcceptableException, Logger } from '@nestjs/common';
import { ReviewRepository } from '../../../../infrastructure/common/repositories/review.repository';
import { ResourceService } from '../../../core/services/resource.service';
import { ReviewSettingService } from '../settings/review-settings.service';
import { ReviewInput } from '../../dtos/inputs/review/review.input';
import { AccreditedUpdate } from '../../dtos/inputs/review/accredited/accredited.update';
import { AccreditedInputType } from '../../dtos/inputs/review/accredited/accredited.input';

@Injectable()
export class ReviewService extends ResourceService<ReviewDto> {
    constructor(readonly repository: ReviewRepository, readonly reviewSettingService: ReviewSettingService) {
        super(repository);
    }
    async createReview(input: ReviewInput) {
        if (input.accredited && input.accredited.accreditedToEmployee) {
            const { bonus, payment } = await this.getSetting(input.directoryId);
            input.accredited = {
                ...input.accredited,
                bonus,
                payment,
            };
            // TODO: Update user field payment
        }
        return await this.createResource(input);
    }

    async accreditReview(id: string, input: AccreditedInputType) {
        const { directoryId, accredited } = await this.repository.getOne(id);
        if (accredited && typeof accredited.accreditedToEmployee === 'boolean') {
            Logger.log(accredited as AccreditedType, 'accredited');
            throw new NotAcceptableException('This review has already been accredited');
        }
        let changes = input;
        if (input.accreditedToEmployee) {
            const { bonus, payment } = await this.getSetting(directoryId);
            changes = {
                ...input,
                bonus,
                payment,
            };
            // TODO: Update user field payment

        }
        return await this.repository.updateOne(id, { accredited: changes });
    }

    async updateAccredit(id: string, input: AccreditedUpdate) {
        const review = await this.repository.getOne(id);
        let changes = {};
        Object.keys(input).forEach(x => changes[`accredited.${x}`] = input[x]);
        if (input.accreditedToEmployee && (review.accredited && !review.accredited.accreditedToEmployee)) {
            const { bonus, payment } = await this.getSetting(review.directoryId);
            changes = {
                ...changes,
                'accredited.bonus': bonus,
                'accredited.payment': payment,
            };
            // TODO: Update user field payment
        }
        return await this.repository.updateOne(review.id, changes);
    }

    async getSetting(directoryId: string) {
        let setting = await this.reviewSettingService.findOne(directoryId);
        return {
            bonus: setting.bonus,
            payment: setting.payment,
        };
    }

    async filterReview(filter: object, skip: number, limit: number) {
        const total = await this.repository.count(filter);
        return {
            items: await this.repository.find(filter, skip, limit),
            total,
            hasMore: limit + skip < total,
        };
    }
}
