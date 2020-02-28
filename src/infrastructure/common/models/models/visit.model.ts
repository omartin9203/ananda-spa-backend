import { ResourceModel } from '../../../core/models/models/resource.model';
import { IDiagnostic } from '../interfaces/generics/diagnostic.interface';

export class VisitModel extends ResourceModel {
  readonly clientId: string;
  readonly performedById: string;
  readonly date: Date;
  readonly photos: string[];
  readonly observations: string;
  readonly diagnostic: IDiagnostic;
  readonly formId?: string;
}
