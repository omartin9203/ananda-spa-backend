import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthDto {
  @Field()
  readonly success: boolean;
  @Field()
  readonly message: string;
  @Field({nullable: true})
  readonly jwt?: string;
  @Field({nullable: true})
  readonly id?: string;
}
