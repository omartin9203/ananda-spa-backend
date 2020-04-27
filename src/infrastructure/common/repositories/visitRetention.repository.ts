import { VisitRetentionModel } from "../models/models/visitRetention.model";
import { ResourceRepository } from "../../core/repositories/resource.repository";
import { VISIT_RETENTION_MODEL_NAME } from "../../../constants/modules/models_names";
import { QueryBuilderService } from "../../core/services/query-builder.service";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class VisitRetentionRepository extends ResourceRepository<VisitRetentionModel> {
    constructor(
        @InjectModel(VISIT_RETENTION_MODEL_NAME) private readonly model: Model<VisitRetentionModel>,
        private readonly querybuilderService: QueryBuilderService,
    ) {
        super(model, querybuilderService);
    }
    async getRetention(user: string, treatment?: string, initialDate?: Date, endDate?: Date) {
        const match = { "userId": user };
        if (treatment) {
            match['treatment'] = treatment;
        }
        if (initialDate || endDate) {
            match['createdAt'] = {};
            if (initialDate) match['createdAt']["$gte"] = initialDate;
            if (endDate) match['createdAt']["$lt"] = endDate;
        }
        await this.model.aggregate([
            { "$match": match },
            {
                "$group": {
                    _id: "clientPhone",
                    count: { $sum: 1 },
                }
            },
        ]);
    }
}