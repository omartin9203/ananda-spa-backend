import { Field, ObjectType } from 'type-graphql';
import PaginatedResponse from '../../../../core/dtos/PaginatedResponse';
import { UserDto } from './user.dto';

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(UserDto) {
  // we can freely add more fields or overwrite the existing one's types
  @Field(type => [String])
  otherInfo: string[];
}
