import { Operators } from './operators.enum';
import { IFieldFilter } from './types/IFieldFilter';
import * as mongoose from 'mongoose';

const { Query } = mongoose;

export class QueryOptions<T> {
  fieldsFilter: Array<IFieldFilter<T>>;
  op: Operators;
  getQuery() {
    const queryBuilder = new Query();
    const fieldsFilterBuilder = this.fieldsFilter.map(x => x.getFilter());
    return this.op === Operators.OR ? queryBuilder.or(fieldsFilterBuilder) : queryBuilder.and(fieldsFilterBuilder);
  }
}
