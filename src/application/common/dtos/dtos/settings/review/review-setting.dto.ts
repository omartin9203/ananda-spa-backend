import { BaseSettingDto } from "../base/base-setting.dto";
import { ObjectType, Field } from "type-graphql";
import {ResourceDto} from "../../../../../core/dtos/resource.dto";

@ObjectType()
export class ReviewSettingDto extends ResourceDto {
    @Field()
    directoryName: string;
    @Field()
    bonus: number;
    @Field()
    payment: number;
    @Field()
    percentage: number;
    @Field()
    minOverall: number;
    @Field({ nullable: true })
    icon?: string;
    @Field({ nullable: true })
    iconReview?: string;
    @Field({ nullable: true })
    iconColored?: string;
}
