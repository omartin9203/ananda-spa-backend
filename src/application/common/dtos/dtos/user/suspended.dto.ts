import { Field, ObjectType, GraphQLISODateTime } from 'type-graphql';

@ObjectType('SuspendedType')
export class SuspendedDto {
  @Field({ defaultValue: false })
  isSuspended: boolean;
  @Field({ nullable: true })
  endDate?: Date;
}
