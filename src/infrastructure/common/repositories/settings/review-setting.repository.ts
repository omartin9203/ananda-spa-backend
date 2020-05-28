import { ReviewSettingModel } from "../../models/models/settings/review-setting.model";
import { ResourceRepository } from "../../../core/repositories/resource.repository";
import { InjectModel } from "@nestjs/mongoose";
import { REVIEW_SETTING_MODEL_NAME } from "../../../../constants/modules/models_names";
import { QueryBuilderService } from "../../../core/services/query-builder.service";
import { Model } from 'mongoose';

export class ReviewSettingRepository extends ResourceRepository<ReviewSettingModel> {
    constructor(
        @InjectModel(REVIEW_SETTING_MODEL_NAME) model: Model<ReviewSettingModel>,
        private readonly querybuilderService: QueryBuilderService,
    ) {
        super(model, querybuilderService);
    }
}
