import { VisitRetentionModel } from "../models/models/visitRetention.model";
import { ResourceRepository } from "../../core/repositories/resource.repository";
import { VISIT_RETENTION_MODEL_NAME } from "../../../constants/modules/models_names";
import { QueryBuilderService } from "../../core/services/query-builder.service";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { FLAG_RETENTION } from '../../../constants/modules/enums';

@Injectable()
export class VisitRetentionRepository extends ResourceRepository<VisitRetentionModel> {
    constructor(
        @InjectModel(VISIT_RETENTION_MODEL_NAME) private readonly model: Model<VisitRetentionModel>,
        private readonly querybuilderService: QueryBuilderService,
    ) {
        super(model, querybuilderService);
    }
    async getRetention(filter: any = {}, sort: string = '-date', skip = 0, limit = 10) {
        return await this.model.aggregate()
          .match(filter)
          .sort(sort)
          .group({
              id: null,
              total: {
                  $sum: 1,
              },
              items: {
                  $push: '$$ROOT',
              },
              personal: {
                  $sum: {
                      $cond: [
                          {
                              $eq: ['$flag', FLAG_RETENTION.PERSONAL],
                          }, 1, 0,
                      ],
                  },
              },
              request: {
                  $sum: {
                      $cond: [
                          {
                              $eq: ['$flag', FLAG_RETENTION.REQUEST],
                          }, 1, 0,
                      ],
                  },
              },
          })
          .project({
              paginate: {
                  total: '$total',
                  items: { $slice: ['$items', skip, limit] },
                  hasMore: {
                      $lt: [ skip + limit, '$total'],
                  },
              },
              personal: 1,
              request: 1,
              performance: {
                  $multiply: [
                      100,
                      {
                          $cond: [
                              '$total',
                              {
                                  $divide: [
                                      {
                                          $sum: ['$personal', '$request'],
                                      },
                                      '$total',
                                  ],
                              },
                              0,
                          ],
                      },
                  ],
              },
              _id: 0,
          });
    }
}
