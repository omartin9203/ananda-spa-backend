import { Field, ObjectType } from 'type-graphql';
import { UserInfoDto } from '../user/user.Info.dto';

@ObjectType()
export class NoteType {
  @Field()
  id: string;
  @Field()
  text: string;
  @Field()
  status: string;
  @Field()
  performedById: string;
}
