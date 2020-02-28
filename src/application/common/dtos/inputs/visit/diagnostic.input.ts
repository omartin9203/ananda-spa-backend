import { Field, InputType } from 'type-graphql';
import { IsArray, IsBoolean, IsDate, IsString } from 'class-validator';
import { RecommendedProductInputType } from './recommended-product.input';

@InputType()
export class CreateDiagnosticInputType {
  @Field()
  @IsString()
  typeOfKind: string;
  @Field()
  @IsString()
  fitzpatrickClassification: string;
  @Field(type => [String], { nullable: true })
  @IsArray()
  conditionsAndConcerns?: string[];
  @Field()
  @IsString()
  texture: string;
  @Field({ nullable: true })
  @IsDate()
  todaysDate?: Date;
  @Field({ nullable: true })
  @IsString()
  typeOfTreatment?: string;
  @Field({ nullable: true })
  @IsString()
  specificClientsConcerns?: string;
  @Field({ nullable: true })
  @IsString()
  notesOrRemarks?: string;
  @Field(type => [String], { nullable: true })
  @IsArray()
  productsUsedToday?: string[];
  @Field({ nullable: true })
  @IsBoolean()
  extractions?: boolean;
  @Field({ nullable: true })
  @IsBoolean()
  steam?: boolean;
  @Field({ nullable: true })
  @IsBoolean()
  highFrecuency?: boolean;
  @Field({ nullable: true })
  todaysRecommendedProducts?: RecommendedProductInputType;
}
