import { ReviewSettingDto } from "./review-setting.dto";
import PaginatedResponse from "../../../../../core/dtos/PaginatedResponse";
import { ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedReviewSettingResponse extends PaginatedResponse(ReviewSettingDto) {
    // we can freely add more fields or overwrite the existing one's types
}