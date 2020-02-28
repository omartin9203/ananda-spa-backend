import { Field, ObjectType } from 'type-graphql';
import { RecommendedProductDto } from './recommended-product.dto';

@ObjectType('DiagnosticType')
export class DiagnosticType {
  @Field({nullable: true})
  typeOfKind?: string;
  @Field({nullable: true})
  fitzpatrickClassification?: string;
  @Field(type => [String], {nullable: true})
  conditionsAndConcerns?: string[];
  @Field({nullable: true})
  texture?: string;
  @Field({nullable: true})
  todaysDate?: Date;
  @Field({nullable: true})
  typeOfTreatment?: string;
  @Field({nullable: true})
  specificClientsConcerns?: string;
  @Field({nullable: true})
  notesOrRemarks?: string;
  @Field(type => [String], {nullable: true})
  productsUsedToday?: string[];
  @Field({nullable: true})
  extractions?: boolean;
  @Field({nullable: true})
  steam?: boolean;
  @Field({nullable: true})
  highFrecuency?: boolean;
  @Field({nullable: true})
  todaysRecommendedProducts?: RecommendedProductDto;
}
