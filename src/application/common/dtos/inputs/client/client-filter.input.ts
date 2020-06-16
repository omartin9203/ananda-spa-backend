import { Field, InputType } from 'type-graphql';
import { SearcheableFilterInput } from '../../../../core/dtos/filter/SearcheableFilterInput';
import { QueryFilterStringDto } from '../../../../core/dtos/filter/query-filter/query-filter-string.dto';
import { QueryFilterDateDto } from '../../../../core/dtos/filter/query-filter/query-filter-date.dto';
import { QueryFilterIdDto } from '../../../../core/dtos/filter/query-filter/query-filter-id.dto';
import { fixSelectors } from '../../../../core/dtos/filter/query-filter/fix-selector';

@InputType()
export class ClientFilterInput extends SearcheableFilterInput {
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // email?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // userName?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // firstname?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // lastName?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // phone?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // streetAddress?: QueryFilterStringDto;
  // // @Field(type => QueryFilterStringDto, {nullable: true})
  // // address2?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // city?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // state?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // zipCode?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // dateOfBirth?: QueryFilterDateDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // gender?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // status?: QueryFilterStringDto;
  // @Field(type => QueryFilterIdDto, {nullable: true})
  // id?: QueryFilterIdDto;
  static getQuery(filter: ClientFilterInput) {
    const query: any = ClientFilterInput.getSearchQuery(filter.search, [ 'firstname', 'lastname', 'phone', 'email']);
    Object.getOwnPropertyNames(filter)
      .filter(x => x !== 'search' && Object.getOwnPropertyDescriptor(filter, x).value)
      .forEach(x => query[`${ClientFilterInput.fixField(x)}`] = fixSelectors(filter[x]));
    return query;
  }
  static fixField(x: string) {
    switch (x) {
      case 'id':
        return '_id';
      // case 'critical':
      //   return 'accredited.critical';
      default:
        return x;
    }
  }
}
