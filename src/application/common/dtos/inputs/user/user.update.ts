import { Field, InputType } from 'type-graphql';
import { IsAlpha, IsAlphanumeric, IsDate, IsEmail, IsIn, IsPhoneNumber, IsString, Min } from 'class-validator';
import { GENDER_OPTIONS, GENDER_OPTIONSS_VALUES, STATUS_VALUES } from '../../../../../constants/constants';
import { RetentionUserInput } from './retention.user.input';
import { ColorSettingInput } from '../settings/color/color-setting.input';


@InputType('UpdateUserInput')
export class UpdateUserInput {
    @Field({ nullable: true })
    // @IsEmail()
    email?: string;
    // @IsAlphanumeric()
    @Field({ nullable: true })
    userName?: string;
    // @IsAlpha()
    @Field({ nullable: true })
    firstName?: string;
    @Field({ nullable: true })
    // @IsAlpha()
    lastName?: string;
    @Field({ nullable: true })
    // @Min(6)
    password?: string;
    @Field({ nullable: true })
    // @IsPhoneNumber('US')
    phone?: string;
    @Field({ nullable: true })
    // @IsString()
    imgSrc?: string;
    @Field({ nullable: true })
    // @IsString()
    streetAddress?: string;
    @Field({ nullable: true })
    // @IsString()
    address2?: string;
    @Field({ nullable: true })
    // @IsString()
    city?: string;
    @Field({ nullable: true })
    // @IsString()
    state?: string;
    @Field({ nullable: true })
    // @IsString()
    zipCode?: string;
    @Field({ nullable: true })
    // @IsDate()
    dateOfBirth?: Date;
    @Field({ nullable: true })
    // @IsIn(GENDER_OPTIONSS_VALUES)
    gender?: string;
    @Field({ nullable: true })
    // @IsIn(STATUS_VALUES)
    status?: string;
    @Field(() => [String], { nullable: true })
    roles?: string[];
    @Field({ nullable: true })
    retention?: RetentionUserInput;
    @Field({nullable: true})
    colorId?: string;
    // @Field({ nullable: true })
    // suspended?: SuspendedDto;
}
