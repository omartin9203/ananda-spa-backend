import { Field, ObjectType } from 'type-graphql';
import PaginatedResponse from '../../../../core/dtos/PaginatedResponse';
import { DiagnosticDto } from './diagnostic.dto';

@ObjectType()
export class PaginatedDiagnosticResponse extends PaginatedResponse(DiagnosticDto) { }
