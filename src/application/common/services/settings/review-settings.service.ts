import { Injectable } from "@nestjs/common";
import { ReviewSettingDto } from "../../dtos/dtos/settings/review/review-setting.dto";
import { ResourceService } from "../../../core/services/resource.service";
import { ReviewSettingRepository } from "../../../../infrastructure/common/repositories/settings/review-setting.repository";

@Injectable()
export class ReviewSettingService extends ResourceService<ReviewSettingDto> {
    constructor(repository: ReviewSettingRepository) {
        super(repository);
    }
}
