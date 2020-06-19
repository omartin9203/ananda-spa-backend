import { Field, ObjectType } from 'type-graphql';
import { STATUS } from '../../../../../constants';

@ObjectType()
export class AuthSignUpDto {
  @Field()
  readonly success: boolean;
  @Field()
  readonly message: string;
  @Field({nullable: true})
  readonly userId?: string;
  @Field({nullable: true})
  readonly status?: STATUS;
  @Field(t => [String], {nullable: true})
  readonly roles?: string[];
}
