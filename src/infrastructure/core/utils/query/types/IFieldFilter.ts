import { IFieldFilterOptions } from './IFieldFilterOptions';

export abstract class IFieldFilter<T> {
  field: string;
  options: IFieldFilterOptions<T>;
  getFilter() {
    const res = {};
    res[this.field] = this.options;
    return res;
  }
}
