import { Field, InputType } from 'type-graphql';
import { IsDateString, IsString } from 'class-validator';

@InputType('UpdateClientInput')
export class  UpdateClientInputDto {
  @Field({nullable: true})
  @IsString()
  firstname?: string;
  @Field({nullable: true})
  @IsString()
  lastname?: string;
  @Field({nullable: true})
  @IsString()
  phone?: string;
  @Field({nullable: true})
  @IsString()
  streetaddress?: string;
  @Field({nullable: true})
  @IsString()
  city?: string;
  @Field({nullable: true})
  @IsString()
  state?: string;
  @Field({nullable: true})
  @IsString()
  zipcode?: string;
  @Field({nullable: true})
  @IsString()
  email?: string;
  @Field({nullable: true})
  @IsDateString()
  datebirth?: Date;
  @Field({nullable: true})
  readonly imgSrc?: string;
  @Field({nullable: true})
  readonly gender?: string;

}
