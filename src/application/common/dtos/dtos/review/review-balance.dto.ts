import { ObjectType, Field } from "type-graphql";
import { ReviewSettingDto } from "../settings/review/review-setting.dto";

@ObjectType()
export class ReviewBalanceDto {
    @Field(type => ReviewSettingDto)
    directory: ReviewSettingDto;
    @Field()
    achieved: number;
    @Field()
    overall: number;
    @Field()
    sumStars: number;
    @Field()
    criticals: number;
}