import { Field, ObjectType } from 'type-graphql';
import { ResourceDto } from '../../../../../core/dtos/resource.dto';

@ObjectType()
export class ServiceSettingDto extends ResourceDto {
  @Field()
  name: string;
  @Field(type => [String])
  roles: string[];
}
