import { Field, ObjectType } from 'type-graphql';
import { MassageFormDto } from './massage-form.dto';
import PaginatedResponse from '../../../../../core/dtos/PaginatedResponse';

@ObjectType()
export class PaginatedMassageFormResponse extends PaginatedResponse(MassageFormDto) {
  // we can freely add more fields or overwrite the existing one's types
  @Field(type => [String])
  otherInfo: string[];
}
