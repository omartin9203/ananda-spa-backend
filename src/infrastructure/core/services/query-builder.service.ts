import { Injectable, Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { QueryOptions } from '../utils/query/query-filter.util';
import { Operators } from '../utils/query/operators.enum';
import { FilterString } from '../utils/query/types/FilterString';

const Query = mongoose.Query;

@Injectable()
export class QueryBuilderService {
  queryByOr(queryObject: any) {
    Logger.log(queryObject, 'queryObject');
    const res: object[] = [];
    for (const prop of [...queryObject]) {
      res.push(prop);
    }
    // Logger.log(res, 'queryResult');
    return res;
  }
  buildQueryContains(exp: string, fields: string[], operator: Operators) {
    const splitedRegExp = exp.split(' ').map(x => new RegExp(x.replace('.', '\.'), 'si'));
    // const regex = new RegExp(exp, 'si');

    const queryFilters = new Query();
    for (let i = 0;  i < splitedRegExp.length; i++) {
      const regExp = splitedRegExp[i];
      // const queryFilter = {
      //   op: operator,
      //   fieldsFilter: fields.map(field => {
      //     return {
      //       field,
      //       options: {
      //         $regex: regExp,
      //       },
      //     } as FilterString;
      //   }),
      // } as QueryOptions<string>;
      const queryFilter = new QueryOptions<string>();
      queryFilter.op = operator;
      queryFilter.fieldsFilter = fields.map(field => {
        const a = new FilterString();
        a.field = field;
        a.options = {
          $regex: regExp,
          // $match: { $text: { $search: exp} },
        };
        return a;
      });
      queryFilters.and([queryFilter.getQuery().getQuery()]);
    }

    return queryFilters.getQuery();
    // return { $text: { $search: regex } };
  }
  buildQueryEq(filterObject: any, operator: Operators = Operators.AND) {
    // const queryFilters = new Query();
    const queryFilter = new QueryOptions<string>();
    queryFilter.op = operator;
    queryFilter.fieldsFilter = Object.keys(filterObject).map(key => {
      const a = new FilterString();
      a.field = key;
      a.options = {
        $eq: filterObject[key],
      };
      return a;
    });
    // queryFilters.and([queryFilter.getQuery().getQuery()]);

    return queryFilter.getQuery().getQuery();
  }
}
