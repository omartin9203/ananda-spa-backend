import { ReviewModel } from "../models/models/review.model";
import { ResourceRepository } from "../../core/repositories/resource.repository";
import { Injectable } from "@nestjs/common";
import { REVIEW_MODEL_NAME } from "../../../constants/modules/models_names";
import { QueryBuilderService } from "../../core/services/query-builder.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class ReviewRepository extends ResourceRepository<ReviewModel> {
    constructor(
        @InjectModel(REVIEW_MODEL_NAME) private readonly model: Model<ReviewModel>,
        private readonly querybuilderService: QueryBuilderService,
    ) {
        super(model, querybuilderService);
    }
}