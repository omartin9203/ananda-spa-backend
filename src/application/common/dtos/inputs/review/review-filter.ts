import {Field, InputType} from 'type-graphql';
import {SearcheableFilterInput} from '../../../../core/dtos/filter/SearcheableFilterInput';
import {QueryFilterStringDto} from '../../../../core/dtos/filter/query-filter/query-filter-string.dto';
import {QueryFilterDateDto} from '../../../../core/dtos/filter/query-filter/query-filter-date.dto';
import {QueryFilterBooleanDto} from '../../../../core/dtos/filter/query-filter/query-filter-boolean.dto';
import {QueryFilterNumberDto} from '../../../../core/dtos/filter/query-filter/query-filter-number.dto';
import {fixSelectors} from '../../../../core/dtos/filter/query-filter/fix-selector';
import { QueryFilterExistsDto } from '../../../../core/dtos/filter/query-filter/query-filter-exists.dto';

@InputType()
export class ReviewFilterInput extends SearcheableFilterInput {
  // @Field(t => QueryFilterStringDto, {nullable: true})
  // client?: QueryFilterStringDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  assignedTo?: QueryFilterStringDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  directoryId?: QueryFilterStringDto;
  @Field(type => QueryFilterDateDto, {nullable: true})
  date?: QueryFilterDateDto;
  @Field(type => QueryFilterBooleanDto, {nullable: true})
  critical?: QueryFilterBooleanDto;
  @Field(type => QueryFilterNumberDto, {nullable: true})
  stars?: QueryFilterNumberDto;
  @Field(type => QueryFilterExistsDto, {nullable: true})
  accredited?: QueryFilterExistsDto;
  static getQuery(filter: ReviewFilterInput) {
    // let query = {};
    // if (filter.search) {
    const query = ReviewFilterInput.getSearchQuery(filter.search, ['client', 'text']);
    // }
    Object.getOwnPropertyNames(filter)
      .filter(x => x !== 'search' && Object.getOwnPropertyDescriptor(filter, x).value)
      .forEach(x => query[`${ReviewFilterInput.fixField(x)}`] = fixSelectors(filter[x]));
    return query;
  }
  static fixField(x: string) {
    switch (x) {
      case 'assignedTo':
        return 'accredited.employeeId';
      case 'critical':
        return 'accredited.critical';
      default:
        return x;
    }
  }
}
