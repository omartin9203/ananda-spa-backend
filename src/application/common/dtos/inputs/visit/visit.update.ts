import { Field, InputType } from 'type-graphql';
import { ResourceDto } from '../../../../core/dtos/resource.dto';
import { IsArray, IsDate, IsString } from 'class-validator';
import { UpdateDiagnosticInputType } from './diagnostic.update';

@InputType()
export class UpdateVisit {
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
  diagnostic?: UpdateDiagnosticInputType;
  @Field({nullable: true})
  @IsString()
  readonly formId?: string;
}
