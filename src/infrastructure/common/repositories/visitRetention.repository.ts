import { VisitRetentionModel } from '../models/models/visitRetention.model';
import { ResourceRepository } from '../../core/repositories/resource.repository';
import { VISIT_RETENTION_MODEL_NAME } from '../../../constants/modules/models_names';
import { QueryBuilderService } from '../../core/services/query-builder.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FLAG_RETENTION } from '../../../constants/modules/enums';
import { fixIdValue } from '../../core/utils/query/fix-filter-value';

@Injectable()
export class VisitRetentionRepository extends ResourceRepository<VisitRetentionModel> {
    constructor(
        @InjectModel(VISIT_RETENTION_MODEL_NAME) private readonly model: Model<VisitRetentionModel>,
        private readonly querybuilderService: QueryBuilderService,
    ) {
        super(model, querybuilderService);
    }
    static fixFilterValues(filter: any) {
        Object.keys(filter).filter(x => ['userId', 'directoryId', 'serviceId'].some(v => v === x)).forEach(x => {
            filter[x] = fixIdValue(filter[x]);
        });
        return filter;
    }
    async getPerformanceRetention(filter: any = {}, sort: string = '-date', skip = 0, limit = 10, withItems = true) {
        filter = VisitRetentionRepository.fixFilterValues(filter);
        const group = withItems ? {items: {$push: '$$ROOT'}} : {};
        const project =
          withItems
          ? {
                paginate: {
                    total: '$total',
                    items: { $slice: ['$items', skip, limit] },
                    hasMore: {
                        $lt: [ skip + limit, '$total'],
                    },
                },
            }
          : {};
        const result = await this.model.aggregate()
          .match(filter)
          .sort(sort)
          .group({
              ...group,
              _id: null,
              total: { $sum: 1 },
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
              ...project,
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
              total: '$total',
              _id: 0,
          });
        return result.length ? { ...result[0], withItems } : {
            total: 0,
            request: 0,
            personal: 0,
            performance: 0,
            paginate: withItems ? {
                items: [],
                total: 0,
                hasMore: false,
            } : undefined,
            withItems,
        };
    }
}
