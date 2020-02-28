import { Field, ID, InterfaceType } from 'type-graphql';

@InterfaceType('IResourceDto')
export abstract class IResourceDto {
  @Field(type => ID)
  readonly id: string;
  @Field()
  readonly createdAt: Date;
  @Field()
  readonly updatedAt: Date;
}
