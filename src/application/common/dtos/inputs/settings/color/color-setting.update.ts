import { Field, InputType } from 'type-graphql';

@InputType()
export class ColorSettingUpdate {
  @Field({nullable: true})
  colorId?: number;
  @Field({nullable: true})
  name?: string;
  @Field({nullable: true})
  hexcode?: string;
}
