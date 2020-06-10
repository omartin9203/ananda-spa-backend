import { Field, InputType } from 'type-graphql';
import { SearcheableFilterInput } from '../../../../core/dtos/filter/SearcheableFilterInput';
import { QueryFilterIdDto } from '../../../../core/dtos/filter/query-filter/query-filter-id.dto';
import { QueryFilterStringDto } from '../../../../core/dtos/filter/query-filter/query-filter-string.dto';
import { QueryFilterDateDto } from '../../../../core/dtos/filter/query-filter/query-filter-date.dto';
import { fixSelectors } from '../../../../core/dtos/filter/query-filter/fix-selector';

@InputType()
export class RetentionFilterInput extends SearcheableFilterInput {
  @Field(type => QueryFilterIdDto, {nullable: true})
  userId?: QueryFilterIdDto;
  @Field(type => QueryFilterIdDto, {nullable: true})
  directoryId?: QueryFilterIdDto;
  @Field(type => QueryFilterIdDto, {nullable: true})
  serviceId?: QueryFilterIdDto;
  @Field(type => QueryFilterDateDto, {nullable: true})
  date?: QueryFilterDateDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  flag?: QueryFilterStringDto;
  static getQuery(filter: RetentionFilterInput) {
    const query = RetentionFilterInput.getSearchQuery(filter.search, ['client.name', 'client.phone']);
    Object.getOwnPropertyNames(filter)
      .filter(x => x !== 'search' && Object.getOwnPropertyDescriptor(filter, x).value)
      .forEach(x => query[`${RetentionFilterInput.fixField(x)}`] = fixSelectors(filter[x]));
    return query;
  }
  static fixField(x: string) {
    switch (x) {
      // case 'assignedTo':
      //   return 'accredited.employeeId';
      // case 'critical':
      //   return 'accredited.critical';
      default:
        return x;
    }
  }
}
