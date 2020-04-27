import { Field, InputType } from 'type-graphql';
import { IsArray, IsDate, IsString } from 'class-validator';

@InputType()
export class UpdateVisit {
  @Field({ nullable: true })
  @IsDate()
  date?: Date;
  @Field(type => [String], {nullable: true})
  @IsArray()
  readonly photos?: string[];
  @Field({nullable: true})
  diagnosticId?: string;
  @Field({nullable: true})
  @IsString()
  formId?: string;
}
