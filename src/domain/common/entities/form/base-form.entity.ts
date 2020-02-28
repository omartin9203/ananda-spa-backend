import { ResourceEntity } from '../../../core/entities/resource.entity';

export class BaseFormEntity extends ResourceEntity {
  readonly clientId: string;
}
