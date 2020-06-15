import { PaginatedVisitRetentionResponse } from './paginate.visitRetention.dto';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RetentionPerformanceDto {
  @Field(t => PaginatedVisitRetentionResponse, {nullable: true})
  readonly paginate?: PaginatedVisitRetentionResponse;
  @Field()
  readonly personal: number;
  @Field()
  readonly request: number;
  @Field()
  readonly total: number;
  @Field()
  readonly performance: number;
}
