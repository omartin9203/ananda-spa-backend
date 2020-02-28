import { ObjectType } from 'type-graphql';
import { IBaseFormDto } from './base-form.interface.dto';
import { ClientDto } from '../../client/client.dto';
// import { IResourceDto } from 'src/application/core/dtos/resource.interface';
import { ResourceDto } from '../../../../../core/dtos/resource.dto';

@ObjectType('BaseFormDto', { implements: IBaseFormDto })
export class BaseFormDto extends ResourceDto implements IBaseFormDto  {
  readonly client?: ClientDto;
}
