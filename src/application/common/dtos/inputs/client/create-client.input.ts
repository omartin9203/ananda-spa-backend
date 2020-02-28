import { Field, InputType } from 'type-graphql';
import { IsDate, IsDateString, IsString } from 'class-validator';

@InputType('CreateClientInput')
export class  CreateClientInputDto {
  @Field()
  @IsString()
  firstname: string;
  @Field()
  @IsString()
  lastname: string;
  @Field()
  @IsString()
  phone: string;
  @Field()
  @IsString()
  streetaddress: string;
  @Field()
  @IsString()
  city: string;
  @Field()
  @IsString()
  state: string;
  @Field()
  @IsString()
  zipcode: string;
  @Field()
  @IsString()
  email: string;
  @Field()
  @IsDate()
  datebirth: Date;
  @Field({nullable: true})
  readonly imgSrc?: string;
  @Field()
  readonly gender: string;

}
