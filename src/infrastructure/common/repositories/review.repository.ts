import { ReviewModel } from '../models/models/review.model';
import { ResourceRepository } from '../../core/repositories/resource.repository';
import { Injectable } from '@nestjs/common';
import { REVIEW_MODEL_NAME } from '../../../constants/modules/models_names';
import { QueryBuilderService } from '../../core/services/query-builder.service';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { fixIdValue } from '../../core/utils/query/fix-filter-value';

@Injectable()
export class ReviewRepository extends ResourceRepository<ReviewModel> {
    constructor(
        @InjectModel(REVIEW_MODEL_NAME) private readonly model: Model<ReviewModel>,
        private readonly querybuilderService: QueryBuilderService,
    ) {
        super(model, querybuilderService);
    }

    async getBalance(userId?: string) {
        const match = {};
        if (userId) { match['accredited.employeeId'] = mongoose.Types.ObjectId(userId); }
        return this.model.aggregate().match(match).group({
            _id: '$directoryId',
            achieved: {$sum: 1},
            overall: {$avg: '$stars'},
            sumStars: {$sum: '$stars'},
            criticals: {$sum: {$cond: ['$accredited.critical', 1, 0]}},
        });
    }
    async getReviewsPerDirectory(filter: any = {}, sort: any = {}, skip = 0, limit = 10) {
        filter = ReviewRepository.fixFilterValues(filter);
        if (Object.keys(filter).includes('$text')) { sort.score = { $meta: 'textScore' }; }
        // filter = {...filter, accredited: { $exists: true }};
        return await this.model.aggregate()
          .match(filter)
          .sort(sort)
          .group({
              _id: '$directoryId',
              items: {
                  $push: '$$ROOT',
              },
              total: { $sum: 1 },
              // overall: {
              //     $avg: {
              //         $multiply: [ '$stars', '$accredited.bonus' ],
              //     },
              // },
              sumStars: {
                  $sum: {
                      $multiply: [
                          '$stars',
                          {
                              $cond: ['$accredited.accreditedToEmployee', '$accredited.bonus', 1 ],
                          },
                      ],
                  },
              },
              totalStars: {
                  $sum: {
                      $cond: ['$accredited.accreditedToEmployee', '$accredited.bonus', 1 ],
                  },
              },
              criticals: { $sum: { $cond: ['$accredited.critical', 1, 0] } },
          })
          .project({
              _id: 1,
              total: 1,
              overall: {
                  $divide: [ '$sumStars', '$totalStars' ],
              },
              sumStars: 1,
              totalStars: 1,
              criticals: 1,
              items: { $slice: ['$items', skip, limit] },
          });
    }
    static fixFilterValues(filter: any) {
        if (Object.keys(filter).includes('accredited.employeeId')) {
            filter['accredited.employeeId'] = fixIdValue(filter['accredited.employeeId']);
        }
        if (Object.keys(filter).includes('directoryId')) {
            filter.directoryId = fixIdValue(filter.directoryId);
        }
        return filter;
    }
    async getUsersBalance(filter: any = {}, sort: any = {}, skip = 0, limit = 10) {
        const match = {
          ...filter,
          'accredited.accreditedToEmployee': true,
        };
        return this.model.aggregate([
          {
            $match: match,
          },
          {
            $group: {
              _id: {
                user: '$accredited.employeeId',
                directory: '$directoryId',
              },
              achieved: { $sum: 1 },
              totalStars: {
                $sum: {
                  $cond: ['$accredited.accreditedToEmployee', '$accredited.bonus', 1],
                },
              },
              sumStars: {
                $sum: {
                  $multiply: [ '$stars', '$accredited.bonus' ],
                },
              },
              critics: { $sum: { $cond: ['$accredited.critical', 1, 0] } },
            },
          },
          {
            $lookup: {
              from: 'settings',
              let: { directoryId: '$_id.directory' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: [ '$_id',  '$$directoryId' ],
                    },
                  },
                },
                {
                  $project: {
                    _id: 0,
                    percentage: 1,
                  },
                },
              ],
              as: 'directories',
            },
          },
          {
            $lookup: {
              from: 'users',
              let: { userId: '$_id.user' },
              pipeline: [
                {
                  $match: // {
                  // '$_id': '$$directoryId',
                    {
                      $expr: {
                        $eq: [ '$_id',  '$$userId' ],
                      },
                    },
                },
                {
                  $project: {
                    _id: 0,
                    retention: 1,
                  },
                },
              ],
              as: 'retentions',
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [
                  {
                    $arrayElemAt: [ '$directories', 0 ],
                  },
                  { $arrayElemAt: [ '$retentions', 0 ] },
                  '$$ROOT',
                ],
              },
            },
          },
          {
            $project: {
              retentions: 0,
              directories: 0,
            },
          },
          {
            $group: {
              _id: '$_id.user',
              sumStars: {
                $sum: '$sumStars',
              },
              totalStars: {
                $sum: '$totalStars',
              },
              retention: {
                $first: {
                  $multiply: [
                    100,
                    {
                      $divide: [ '$retention.important', '$retention.total' ],
                    },
                  ],
                },
              },
              expectedReviews: {
                $avg: {
                  $multiply: [
                    100,
                    {
                      $divide: [
                        '$achieved',
                        {
                          $divide: [
                            {
                              $multiply: ['$percentage', '$retention.total'],
                            },
                            100,
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
              critics: {
                $sum: '$critics',
              },
            },
          },
          {
            $project: {
              _id: 0,
              userId: '$_id',
              retention: {
                $trunc: [ '$retention', 0 ],
              },
              expectedReviews: {
                $trunc: [ '$expectedReviews', 0 ],
              },
              overall: {
                $trunc: [
                  {
                    $divide: [ '$sumStars', '$totalStars'],
                  },
                  1,
                ],
              },
              critics: 1,
            },
          },
          {
            $sort: {
              overall: -1,
            },
          },
        ]);
    }
}
