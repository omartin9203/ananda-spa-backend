import { ResourceModel } from '../../../core/models/models/resource.model';
import { IDiagnostic } from '../interfaces/generics/diagnostic.interface';
import { INote } from '../interfaces/generics/note.interface';

export class VisitModel extends ResourceModel {
  readonly clientId: string;
  readonly performedById: string;
  readonly date: Date;
  readonly photos: string[];
  readonly notes: INote[];
  readonly diagnosticId: string;
  readonly formId?: string;
}
