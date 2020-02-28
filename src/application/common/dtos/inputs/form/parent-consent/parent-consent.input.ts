import { Field, InputType, InterfaceType } from 'type-graphql';

@InputType('ParentConsentInput')
export class ParentConsentInput {
  @Field({ nullable: true })
  firstname?: string;
  @Field({ nullable: true })
  lastname?: string;
  @Field({ nullable: true })
  signature?: string;
}
