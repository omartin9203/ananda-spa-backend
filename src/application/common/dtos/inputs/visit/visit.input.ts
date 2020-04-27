import { Field, InputType } from 'type-graphql';
import { IsArray, IsDate, IsString } from 'class-validator';
import { NoteInput } from './notes';
import {CreateDiagnosticInputDto} from '../diagnostic/diagnostic.input';

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
  @Field(type => [NoteInput], {nullable: true})
  @IsArray()
  readonly notes: NoteInput[];
  @Field(type => CreateDiagnosticInputDto, {nullable: true})
  diagnostic?: CreateDiagnosticInputDto;
  @Field({nullable: true})
  formId?: string;
}
