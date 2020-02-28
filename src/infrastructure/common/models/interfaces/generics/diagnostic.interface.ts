import { IRecommendedProduct } from './recommended-products.interface';

export interface IDiagnostic {
  readonly typeOfKind: string;
  readonly fitzpatrickClassification: string;
  readonly conditionsAndConcerns: string[];
  readonly texture: string;
  readonly todaysDate: Date;
  readonly typeOfTreatment: string;
  readonly specificClientsConcerns: string;
  readonly notesOrRemarks: string;
  readonly productsUsedToday: string[];
  readonly extractions: boolean;
  readonly steam: boolean;
  readonly highFrecuency: boolean;
  readonly todaysRecommendedProducts: IRecommendedProduct;
}
