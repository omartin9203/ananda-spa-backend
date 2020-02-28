import { Field, ObjectType } from 'type-graphql';
import PaginatedResponse from '../../../../../core/dtos/PaginatedResponse';
import { FacialFormDto } from './facial-form.dto';

@ObjectType()
export class PaginatedFacialFormResponse extends PaginatedResponse(FacialFormDto) {
  // we can freely add more fields or overwrite the existing one's types
  @Field(type => [String])
  otherInfo: string[];
}
