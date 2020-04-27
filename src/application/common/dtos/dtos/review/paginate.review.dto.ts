import { ObjectType } from 'type-graphql';
import PaginatedResponse from '../../../../core/dtos/PaginatedResponse';
import { ReviewDto } from './review.dto';

@ObjectType()
export class PaginatedReviewResponse extends PaginatedResponse(ReviewDto) { }