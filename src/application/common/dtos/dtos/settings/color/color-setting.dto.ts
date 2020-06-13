import { ResourceDto } from '../../../../../core/dtos/resource.dto';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ColorSettingDto extends ResourceDto {
  @Field()
  colorId: number;
  @Field()
  name: string;
  @Field()
  hexcode: string;
}