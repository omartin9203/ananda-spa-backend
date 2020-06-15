import { Field, InputType } from 'type-graphql';
import { IsAlpha, IsAlphanumeric, IsDate, IsEmail, IsIn, IsPhoneNumber, IsString, Min } from 'class-validator';
import { GENDER_OPTIONSS_VALUES, STATUS_VALUES } from '../../../../../constants/constants';
import { SearcheableFilterInput } from '../../../../core/dtos/filter/SearcheableFilterInput';
import { QueryFilterStringDto } from '../../../../core/dtos/filter/query-filter/query-filter-string.dto';
import { QueryFilterDateDto } from '../../../../core/dtos/filter/query-filter/query-filter-date.dto';
import { fixSelectors } from '../../../../core/dtos/filter/query-filter/fix-selector';
import { QueryFilterIdDto } from '../../../../core/dtos/filter/query-filter/query-filter-id.dto';
import { QueryFilterExistsDto } from '../../../../core/dtos/filter/query-filter/query-filter-exists.dto';

@InputType()
export class UserFilterInput extends SearcheableFilterInput {
  @Field(type => QueryFilterStringDto, {nullable: true})
  email?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // userName?: QueryFilterStringDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  firstName?: QueryFilterStringDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  lastName?: QueryFilterStringDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  phone?: QueryFilterStringDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  streetAddress?: QueryFilterStringDto;
  // @Field(type => QueryFilterStringDto, {nullable: true})
  // address2?: QueryFilterStringDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  city?: QueryFilterStringDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  state?: QueryFilterStringDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  zipCode?: QueryFilterStringDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  dateOfBirth?: QueryFilterDateDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  gender?: QueryFilterStringDto;
  @Field(type => QueryFilterStringDto, {nullable: true})
  status?: QueryFilterStringDto;
  @Field(type => QueryFilterIdDto, {nullable: true})
  id?: QueryFilterIdDto;
  @Field(type => QueryFilterIdDto, {nullable: true})
  colorId?: QueryFilterIdDto;
  static getQuery(filter: UserFilterInput) {
    const query: any = UserFilterInput.getSearchQuery(filter.search, ['email', 'firstName', 'lastName', 'phone']);
    Object.getOwnPropertyNames(filter)
      .filter(x => x !== 'search' && Object.getOwnPropertyDescriptor(filter, x).value)
      .forEach(x => query[`${UserFilterInput.fixField(x)}`] = fixSelectors(filter[x]));
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
