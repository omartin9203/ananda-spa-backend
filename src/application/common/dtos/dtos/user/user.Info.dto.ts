import { Field, ID, ObjectType } from 'type-graphql';
import { ResourceDto } from '../../../../core/dtos/resource.dto';

@ObjectType()
export class UserInfoDto extends ResourceDto {
  @Field()
  readonly email: string;
  // @Field()
  // readonly userName: string;
  @Field()
  readonly firstName: string;
  @Field()
  readonly lastName: string;
  @Field()
  readonly status: string;
  @Field()
  readonly imgSrc: string;
  @Field()
  readonly phone: string;
  @Field(type => [String])
  roles: string[];

}
