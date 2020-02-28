import { Field, InputType } from 'type-graphql';
import { IsDateString, IsString, IsArray, IsDate, IsBoolean } from 'class-validator';
import { RecommendedProductInput } from './recommended-product.input';

@InputType('CreateDiagnosticInput')
export class  CreateDiagnosticInputDto {
  @Field()
  @IsString()
  clientId: string;
  @Field()
  @IsString()
  performedById: string;
  @Field({ nullable: true })
  @IsDate()
  date?: Date;
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
  todaysRecommendedProducts?: RecommendedProductInput;
}
