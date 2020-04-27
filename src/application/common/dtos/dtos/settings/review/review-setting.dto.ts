import { BaseSettingDto } from "../base/base-setting.dto";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ReviewSettingDto extends BaseSettingDto {
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
}
