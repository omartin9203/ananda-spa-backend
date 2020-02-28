import { Field, InputType } from 'type-graphql';
import { IsArray, IsDate, IsString } from 'class-validator';
import { CreateDiagnosticInputType } from './diagnostic.input';

@InputType()
export class CreateVisit {
  @Field()
  @IsString()
  clientId: string;
  @Field()
  @IsString()
  performedById: string;
  @Field({ nullable: true })
  @IsDate()
  date?: Date;
  @Field(type => [String], {nullable: true})
  @IsArray()
  readonly photos?: string[];
  @Field({nullable: true})
  @IsString()
  readonly observations?: string;
  @Field({nullable: true})
  diagnostic?: CreateDiagnosticInputType;
  @Field({nullable: true})
  @IsString()
  formId?: string;
}
