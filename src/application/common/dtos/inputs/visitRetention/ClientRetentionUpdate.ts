import { Field, InputType } from 'type-graphql';

@InputType()
export class ClientRetentionUpdate {
  @Field({nullable: true})
  readonly name?: string;
  @Field({nullable: true})
  readonly phone?: string;
}
