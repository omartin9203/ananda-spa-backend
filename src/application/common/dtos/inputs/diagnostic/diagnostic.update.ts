import { Field, InputType } from 'type-graphql';
import { IsDateString, IsString, IsArray, IsDate, IsBoolean } from 'class-validator';
import { RecommendedProductInput } from './recommended-product.input';

@InputType()
export class UpdateDiagnosticDto {
  @Field({ nullable: true })
  @IsDate()
  date?: Date;
  @Field({ nullable: true })
  @IsString()
  typeOfKind?: string;
  @Field({ nullable: true })
  @IsString()
  fitzpatrickClassification?: string;
  @Field(type => [String], { nullable: true })
  @IsArray()
  conditionsAndConcerns?: string[];
  @Field({ nullable: true })
  @IsString()
  texture?: string;
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
  todaysRecommendedProducts?: RecommendedProductInput;
}
