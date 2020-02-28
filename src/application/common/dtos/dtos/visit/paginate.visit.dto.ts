import { ObjectType } from 'type-graphql';
import PaginatedResponse from '../../../../core/dtos/PaginatedResponse';
import { VisitDto } from './visit.dto';

@ObjectType()
export class PaginatedVisitResponse extends PaginatedResponse(VisitDto) { }
