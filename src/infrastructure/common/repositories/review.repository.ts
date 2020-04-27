import { ReviewModel } from "../models/models/review.model";
import { ResourceRepository } from "../../core/repositories/resource.repository";
import { Injectable } from "@nestjs/common";
import { REVIEW_MODEL_NAME } from "../../../constants/modules/models_names";
import { QueryBuilderService } from "../../core/services/query-builder.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema } from 'mongoose';
import { IReviewBlance } from "../models/interfaces/generics/review-balance.interface";
import * as mongoose from 'mongoose';

@Injectable()
export class ReviewRepository extends ResourceRepository<ReviewModel> {
    constructor(
        @InjectModel(REVIEW_MODEL_NAME) private readonly model: Model<ReviewModel>,
        private readonly querybuilderService: QueryBuilderService,
    ) {
        super(model, querybuilderService);
    }

    async getUserBalance(userId: string) {
        return this.model.aggregate().match({
            'accredited.employeeId': mongoose.Types.ObjectId(userId),
        }).group({
            _id: '$directoryId',
            achieved: {$sum: 1},
            overall: {$avg: '$stars'},
            sumStars: {$sum: '$stars'},
            criticals: {$sum: {$cond: ['$accredited.critical', 1, 0]}},
        });
    }
}
