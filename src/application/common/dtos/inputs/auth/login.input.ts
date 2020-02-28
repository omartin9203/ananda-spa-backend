import { Field, InputType } from 'type-graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  unique: string;
  @Field()
  @IsString()
  password: string;
}
