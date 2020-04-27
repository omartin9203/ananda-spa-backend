import { Field, ObjectType } from 'type-graphql';
import { ResourceDto } from '../../../../core/dtos/resource.dto';
import { ClientDto } from '../client/client.dto';
import { UserDto } from '../user/user.dto';
import { FacialFormDto } from '../form/facial/facial-form.dto';
import { MassageFormDto } from '../form/massage/massage-form.dto';
import { NoteType } from './note';
import { DiagnosticDto } from '../diagnostic/diagnostic.dto';

@ObjectType()
export class VisitDto extends ResourceDto {
  @Field(type => ClientDto, {nullable: true})
  readonly client?: ClientDto;
  @Field(type => UserDto, {nullable: true})
  performedBy?: UserDto;
  @Field({nullable: true})
  date?: Date;
  @Field(type => [String], {nullable: true})
  readonly photos?: string[];
  @Field(type => [NoteType], {nullable: true})
  readonly notes?: NoteType[];
  @Field(type => DiagnosticDto, {nullable: true})
  diagnostic?: DiagnosticDto;
  @Field(type => FacialFormDto, {nullable: true})
  readonly facialForm?: FacialFormDto;
  @Field(type => MassageFormDto, {nullable: true})
  readonly massageForm?: MassageFormDto;

}
