import { Field, ObjectType } from 'type-graphql';

@ObjectType('ParentConsentType')
export class  ParentConsentType {
  @Field({nullable: true})
  firstname?: string;
  @Field({nullable: true})
  lastname?: string;
  @Field({nullable: true})
  signature?: string;
}
