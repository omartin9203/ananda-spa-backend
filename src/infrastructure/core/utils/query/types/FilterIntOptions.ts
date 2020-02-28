import { IFieldFilterOptions } from './IFieldFilterOptions';

export class FilterIntOptions extends IFieldFilterOptions<number> {
  // $contains?: { value: string; options?: string };
  // $eq?: number;
  // $in?: number[];
  // $ne?: number;
  // $regex?: RegExp;
  $gt?: number;
  $gte?: number;
  $lt?: number;
  $lte?: number;
}
