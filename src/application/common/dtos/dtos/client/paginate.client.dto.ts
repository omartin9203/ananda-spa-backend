import { Field, ObjectType } from 'type-graphql';
import PaginatedResponse from '../../../../core/dtos/PaginatedResponse';
import { ClientDto } from './client.dto';

@ObjectType()
export class PaginatedClientResponse extends PaginatedResponse(ClientDto) {
  // we can freely add more fields or overwrite the existing one's types
  @Field(type => [String])
  otherInfo: string[];
}
