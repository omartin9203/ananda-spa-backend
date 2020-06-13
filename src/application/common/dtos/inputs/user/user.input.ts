import { Field, InputType } from 'type-graphql';
import { IsEmail, IsAlphanumeric, IsAlpha, MinLength, IsPhoneNumber, IsString, IsIn, IsDate } from 'class-validator';
import { GENDER_OPTIONS, GENDER_OPTIONSS_VALUES } from '../../../../../constants/constants';

@InputType('CreateUserInput')
export class UserInput {
  @Field()
  @IsEmail()
  email: string;
  // @Field()
  // @IsAlphanumeric()
  // userName: string;
  @Field()
  @IsAlpha()
  firstName: string;
  @Field()
  @IsAlpha()
  lastName: string;
  @Field()
  @MinLength(6)
  password: string;
  @Field()
  // @IsPhoneNumber('US')
  phone: string;
  @Field()
  @IsString()
  imgSrc: string;
  @Field()
  @IsString()
  streetAddress: string;
  // @Field({nullable: true})
  // // @IsString()
  // address2?: string;
  @Field()
  @IsString()
  city: string;
  @Field()
  @IsString()
  state: string;
  @Field()
  @IsString()
  zipCode: string;
  @Field()
  @IsDate()
  dateOfBirth: Date;
  @Field()
  @IsIn(GENDER_OPTIONSS_VALUES)
  gender: string;
}
