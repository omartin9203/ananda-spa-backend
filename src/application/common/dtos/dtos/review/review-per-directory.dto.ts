import { Field, ObjectType } from 'type-graphql';
import { ReviewSettingDto } from '../settings/review/review-setting.dto';
import { PaginatedReviewResponse } from './paginate.review.dto';

@ObjectType()
export class ReviewPerDirectoryDto {
  @Field()
  directoryId: string;
  @Field(type => PaginatedReviewResponse)
  paginate: PaginatedReviewResponse;
  @Field()
  overall: number;
  @Field()
  sumStars: number;
  @Field()
  totalStars: number;
  @Field()
  criticals: number;
}
