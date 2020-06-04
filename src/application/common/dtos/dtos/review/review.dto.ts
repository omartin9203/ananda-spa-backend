import { ResourceDto } from "../../../../core/dtos/resource.dto";
import { ObjectType, Field } from "type-graphql";
import { DIRECTORY } from "../../../../../constants/modules/enums";
import { UserDto } from "../user/user.dto";
import { UserInfoDto } from "../user/user.Info.dto";
import { ReviewSettingDto } from "../settings/review/review-setting.dto";


@ObjectType()
export class AccreditedType {
    @Field(type => UserInfoDto, { nullable: true })
    manager?: UserInfoDto;
    @Field({ nullable: true })
    accreditedDate?: Date;
    @Field({ nullable: true })
    accreditedToEmployee?: boolean;
    @Field(type => UserInfoDto, { nullable: true })
    employee?: UserInfoDto;
    @Field({ nullable: true })
    critical?: boolean;
    @Field({ nullable: true })
    bonus?: number;
    @Field({ nullable: true })
    payment?: number;
}

@ObjectType()
export class ReviewDto extends ResourceDto {
    @Field()
    client: string;
    @Field({nullable: true})
    externalId?: string;
    @Field({nullable: true})
    embedHTML?: string;
    @Field()
    date: Date;
    @Field()
    text: string;
    @Field()
    stars: number;
    @Field(type => ReviewSettingDto, { nullable: true })
    directory?: ReviewSettingDto;
    @Field({ nullable: true })
    accredited?: AccreditedType;
}
