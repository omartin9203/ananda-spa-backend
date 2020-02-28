import { Field, ObjectType } from 'type-graphql';
import { ResourceDto } from '../../../../core/dtos/resource.dto';
import { RecommendedProductType } from './recommended-product.dto';
import { ClientDto } from '../client/client.dto';
import { UserDto } from '../user/user.dto';

@ObjectType('DiagnosticDto')
export class DiagnosticDto extends ResourceDto {
  @Field(type => ClientDto, {nullable: true})
  readonly client?: ClientDto;
  @Field(type => UserDto, {nullable: true})
  performedBy?: UserDto;
  @Field({nullable: true})
  date?: Date;
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
  todaysRecommendedProducts?: RecommendedProductType;
}
