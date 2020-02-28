export abstract class IFieldFilterOptions<T> {
  $contains?: {
    value: string;
    options?: string;
  };
  $regex?: RegExp;
  $eq?: T;
  $ne?: T;
  $in?: T[];
  $match?: { $text: { $search: string} };
}
