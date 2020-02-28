import { IFieldFilter } from './IFieldFilter';
import { options } from 'tsconfig-paths/lib/options';
import { FilterIntOptions } from './FilterIntOptions';

export class FilterInt extends IFieldFilter<number> {
  options: FilterIntOptions;
}
