import { ObjectType } from 'type-graphql';
import PaginatedResponse from '../../../../core/dtos/PaginatedResponse';
import { VisitRetentionDto } from './visitRetention.dto';

@ObjectType()
export class PaginatedVisitRetentionResponse extends PaginatedResponse(VisitRetentionDto) { }