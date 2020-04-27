import { Field, ObjectType } from 'type-graphql';
import PaginatedResponse from '../../../../core/dtos/PaginatedResponse';
import { DiagnosticDto } from './diagnostic.dto';

// @ts-ignore
@ObjectType()
export class PaginatedDiagnosticResponse extends PaginatedResponse(DiagnosticDto) { }
