import { Field, ObjectType } from 'type-graphql';

@ObjectType('ParentConsentType')
export class  ParentConsentType {
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field()
  signature: string;
}
