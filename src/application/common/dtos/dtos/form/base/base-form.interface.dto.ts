import { Field, ID, InterfaceType } from 'type-graphql';
import { ClientDto } from '../../client/client.dto';

@InterfaceType('IBaseFormDto')
export abstract class IBaseFormDto {
  // @Field(type => ID)
  // readonly id: string;
  @Field(type => ClientDto, {nullable: true})
  readonly client?: ClientDto;
  // @Field()
  // readonly createdAt: Date;
  // @Field()
  // readonly updatedAt: Date;
}
