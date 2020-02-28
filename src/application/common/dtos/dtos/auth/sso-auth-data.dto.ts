import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthSSODto {
  @Field()
  readonly success: boolean;
  @Field()
  readonly message: string;
  @Field({nullable: true})
  readonly jwt?: string;
}
