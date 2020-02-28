import { Field, InputType } from 'type-graphql';
import { IsAlpha, IsAlphanumeric, IsDate, IsEmail, IsIn, IsPhoneNumber, IsString, Min } from 'class-validator';
import { GENDER_OPTIONSS_VALUES, STATUS_VALUES } from '../../../../../constants';

@InputType()
export class UserFilterInput {
  @Field({nullable: true})
  email?: string;
  @Field({nullable: true})
  userName?: string;
  @Field({nullable: true})
  firstName?: string;
  @Field({nullable: true})
  lastName?: string;
  @Field({nullable: true})
  phone?: string;
  @Field({nullable: true})
  streetAddress?: string;
  @Field({nullable: true})
  address2?: string;
  @Field({nullable: true})
  city?: string;
  @Field({nullable: true})
  state?: string;
  @Field({nullable: true})
  zipCode?: string;
  @Field({nullable: true})
  dateOfBirth?: Date;
  @Field({nullable: true})
  gender?: string;
  @Field({nullable: true})
  status?: string;
}
