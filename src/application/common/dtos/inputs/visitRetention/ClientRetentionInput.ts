import { Field, InputType, InterfaceType } from 'type-graphql';

@InputType()
export class ClientRetentionInput {
  @Field()
  readonly name: string;
  @Field({nullable: true})
  readonly phone?: string;
}
