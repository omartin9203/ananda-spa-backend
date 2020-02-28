import { Field, ID, ObjectType } from 'type-graphql';
import { ResourceDto } from '../../../../core/dtos/resource.dto';
import { IsDate, IsIn, IsPhoneNumber, IsString } from 'class-validator';
import { GENDER_OPTIONS } from '../../../../../constants';

@ObjectType('UserType')
export class UserDto extends ResourceDto {
  @Field()
  readonly email: string;
  @Field()
  readonly userName: string;
  @Field()
  readonly firstName: string;
  @Field()
  readonly lastName: string;
  @Field()
  readonly status: string;
  @Field()
  readonly phone: string;
  @Field()
  readonly imgSrc: string;
  @Field()
  readonly streetAddress: string;
  @Field({nullable: true})
  readonly address2?: string;
  @Field()
  city: string;
  @Field()
  state: string;
  @Field()
  zipCode: string;
  @Field()
  dateOfBirth: Date;
  @Field()
  gender: string;
  @Field(type => [String])
  roles: string[];

  // @Field({ nullable: true })
  // readonly suspended?: SuspendedDto;
}
