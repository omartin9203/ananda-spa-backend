import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ClientRetentionDto {
  @Field()
  readonly name: string;
  @Field({nullable: true})
  readonly phone?: string;
}
