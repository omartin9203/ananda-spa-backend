import {Field, InputType} from 'type-graphql';
import { getRegexFromString } from './query-filter/fix-selector';

@InputType()
export class SearcheableFilterInput {
  @Field({nullable: true})
  search?: string;
  static getSearchQuery(search: string, fields: string[] = []) {
    if (!search) { return {}; }
    const regex = getRegexFromString(search);
    const result = {
      $or: [],
    };
    fields.forEach(x => result.$or.push({
      [x]: {
        $regex: regex,
      },
    }));
    return result;
  }
}
