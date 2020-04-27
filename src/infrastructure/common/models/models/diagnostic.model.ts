import { ResourceModel } from '../../../core/models/models/resource.model';
import { IRecommendedProduct } from '../interfaces/generics/recommended-products.interface';

export class DiagnosticModel extends ResourceModel {
  readonly clientId: string;
  readonly performedById: string;
  readonly date: Date;
  readonly typeOfKind: string;
  readonly fitzpatrickClassification: string;
  readonly conditionsAndConcerns: string[];
  readonly texture: string;
  // readonly todaysDate: Date;
  readonly typeOfTreatment: string;
  readonly specificClientsConcerns: string;
  readonly notesOrRemarks: string;
  readonly productsUsedToday: string[];
  readonly extractions: boolean;
  readonly steam: boolean;
  readonly highFrecuency: boolean;
  readonly todaysRecommendedProducts: IRecommendedProduct;
}
