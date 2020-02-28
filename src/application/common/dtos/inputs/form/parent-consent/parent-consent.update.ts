import { Field, InputType, InterfaceType } from 'type-graphql';

@InputType('UpdateParentConsentInput')
export class  UpdateParentConsentInput {
  @Field({ nullable: true })
  firstname?: string;
  @Field({ nullable: true })
  lastname?: string;
  @Field({ nullable: true })
  signature?: string;
}
