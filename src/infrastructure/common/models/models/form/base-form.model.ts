import { ResourceModel } from 'src/infrastructure/core/models/models/resource.model';

export class BaseFormModel extends ResourceModel {
  readonly clientId: string;
}
