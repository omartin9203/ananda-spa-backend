import { Field, ID, InputType } from 'type-graphql';
import { IsString } from 'class-validator';
import { ParentConsentInput } from '../parent-consent/parent-consent.input';

@InputType('CreateMassageFormInput')
export class MassageFormInput {
  @Field()
  @IsString()
  clientId: string;
  @Field({ nullable: true })
  occupation?: string;
  @Field({ nullable: true })
  emergencyname?: string;
  @Field({ nullable: true })
  emergencyphone?: string;
  @Field({ nullable: true })
  havepro?: boolean;
  @Field({ nullable: true })
  howofter?: string;
  @Field({ nullable: true })
  difficulty?: boolean;
  @Field({ nullable: true })
  qtTwoExplain?: string;
  @Field({ nullable: true })
  allergies?: boolean;
  @Field({ nullable: true })
  qtThreeExplain?: string;
  @Field({ nullable: true })
  sensitive?: boolean;
  @Field({ nullable: true })
  contactlenses?: boolean;
  @Field({ nullable: true })
  dentures?: boolean;
  @Field({ nullable: true })
  hearing?: boolean;
  @Field({ nullable: true })
  workstation?: boolean;
  @Field({ nullable: true })
  qtSixExplain?: string;
  @Field({ nullable: true })
  repetitive?: boolean;
  @Field({ nullable: true })
  qtSevenExplain?: string;
  @Field({ nullable: true })
  experience?: boolean;
  @Field({ nullable: true })
  muscle?: boolean;
  @Field({ nullable: true })
  anxiety?: boolean;
  @Field({ nullable: true })
  insomnia?: boolean;
  @Field({ nullable: true })
  irritability?: boolean;
  @Field({ nullable: true })
  other?: string;
  @Field({ nullable: true })
  particular?: boolean;
  @Field({ nullable: true })
  qtNigthExplain?: string;
  @Field({ nullable: true })
  goals?: boolean;
  @Field({ nullable: true })
  qtTenExplain?: string;
  @Field({ nullable: true })
  arms?: boolean;
  @Field({ nullable: true })
  legs?: boolean;
  @Field({ nullable: true })
  feet?: boolean;
  @Field({ nullable: true })
  shoulder?: boolean;
  @Field({ nullable: true })
  hip?: boolean;
  @Field({ nullable: true })
  uperback?: boolean;
  @Field({ nullable: true })
  lowerback?: boolean;
  @Field({ nullable: true })
  calves?: boolean;
  @Field({ nullable: true })
  medical?: boolean;
  @Field({ nullable: true })
  qtElevenExplain?: string;
  @Field({ nullable: true })
  chiropractor?: boolean;
  @Field({ nullable: true })
  qtTweleExplain?: string;
  @Field({ nullable: true })
  medication?: boolean;
  @Field({ nullable: true })
  qtTreceExplain?: string;
  @Field({ nullable: true })
  contContagious?: boolean;
  @Field({ nullable: true })
  contSores?: boolean;
  @Field({ nullable: true })
  contBruising?: boolean;
  @Field({ nullable: true })
  accident?: boolean;
  @Field({ nullable: true })
  fracture?: boolean;
  @Field({ nullable: true })
  surgery?: boolean;
  @Field({ nullable: true })
  artificial?: boolean;
  @Field({ nullable: true })
  sprains?: boolean;
  @Field({ nullable: true })
  fever?: boolean;
  @Field({ nullable: true })
  swollen?: boolean;
  @Field({ nullable: true })
  sensitivity?: boolean;
  @Field({ nullable: true })
  heart?: boolean;
  @Field({ nullable: true })
  blood?: boolean;
  @Field({ nullable: true })
  circulatory?: boolean;
  @Field({ nullable: true })
  varicose?: boolean;
  @Field({ nullable: true })
  rheumatoid?: boolean;
  @Field({ nullable: true })
  atherosclerosis?: boolean;
  @Field({ nullable: true })
  phlebitis?: boolean;
  @Field({ nullable: true })
  thrombosis?: boolean;
  @Field({ nullable: true })
  osteoporosis?: boolean;
  @Field({ nullable: true })
  epilepsy?: boolean;
  @Field({ nullable: true })
  migraines?: boolean;
  @Field({ nullable: true })
  cancer?: boolean;
  @Field({ nullable: true })
  diabetes?: boolean;
  @Field({ nullable: true })
  sensation?: boolean;
  @Field({ nullable: true })
  neck?: boolean;
  @Field({ nullable: true })
  fibromyalgia?: boolean;
  @Field({ nullable: true })
  tmj?: boolean;
  @Field({ nullable: true })
  carpal?: boolean;
  @Field({ nullable: true })
  tennis?: boolean;
  @Field({ nullable: true })
  pregnancy?: boolean;
  @Field({ nullable: true })
  manymonth?: string;
  @Field({ nullable: true })
  conditionexplain?: string;
  @Field({ nullable: true })
  anything?: string;
  @Field({ nullable: true })
  signature?: string;
  @Field({ nullable: true })
  datecreated?: Date;
  @Field({ nullable: true })
  dateinitial?: string;
  @Field({ nullable: true })
  parentsConsent?: ParentConsentInput;
}
