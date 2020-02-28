import { Field, ID, ObjectType } from 'type-graphql';
import { ResourceDto } from '../../../../core/dtos/resource.dto';

@ObjectType('ClientType')
export class ClientDto extends ResourceDto {
  // @Field(type => ID)
  // readonly id: number;
  @Field()
  readonly firstname: string;
  @Field()
  readonly lastname: string;
  @Field()
  readonly phone: string;
  // readonly address: {
  @Field()
  readonly streetaddress: string;
  @Field()
  readonly city: string;
  @Field()
  readonly state: string;
  @Field()
  readonly zipcode: string;
  // };
  @Field()
  readonly email: string;
  @Field()
  readonly datebirth: Date;
  @Field({nullable: true})
  readonly imgSrc?: string;
  @Field({nullable: true})
  readonly gender: string;

  // @Field()
  // readonly createdAt: Date;
  // @Field()
  // readonly updatedAt: Date;
}
