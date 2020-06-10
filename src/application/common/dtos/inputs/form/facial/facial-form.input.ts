import { Field, ID, InputType } from 'type-graphql';
import { ParentConsentInput } from '../parent-consent/parent-consent.input';

@InputType('CreateFacialFormInput')
export class FacialFormInput {
  @Field()
  clientId: string;
  @Field({ nullable: true })
  recommendation?: string;
  @Field({ nullable: true })
  groupon?: string;
  @Field({ nullable: true })
  business?: string;
  @Field({ nullable: true })
  businessYelp?: boolean;
  @Field({ nullable: true })
  businessGoogle?: boolean;
  @Field({ nullable: true })
  businessGroupon?: boolean;
  @Field({ nullable: true })
  businessClasspass?: boolean;
  @Field({ nullable: true })
  businessFacebook?: boolean;
  @Field({ nullable: true })
  businessRecommendation?: boolean;
  @Field({ nullable: true })
  wearcontact?: boolean;
  @Field({ nullable: true })
  surgery?: boolean;
  @Field({ nullable: true })
  surgerydescribe?: string;
  @Field({ nullable: true })
  skincancer?: boolean;
  @Field({ nullable: true })
  dermatitis?: boolean;
  @Field({ nullable: true })
  keloidscarring?: boolean;
  @Field({ nullable: true })
  acne?: boolean;
  @Field({ nullable: true })
  rosacea?: boolean;
  @Field({ nullable: true })
  broken?: boolean;
  @Field({ nullable: true })
  treatment?: boolean;
  @Field({ nullable: true })
  hypo?: boolean;
  @Field({ nullable: true })
  hyperpig?: boolean;
  @Field({ nullable: true })
  burns?: boolean;
  @Field({ nullable: true })
  anycondition?: boolean;
  @Field({ nullable: true })
  anyconditiondescription?: string;
  @Field({ nullable: true })
  allergies?: boolean;
  @Field({ nullable: true })
  latexallergies?: boolean;
  @Field({ nullable: true })
  otherallergies?: boolean;
  @Field({ nullable: true })
  otherallergiesdescription?: string;
  @Field({ nullable: true })
  prescription?: boolean;
  @Field({ nullable: true })
  prescriptiondescription?: string;
  @Field({ nullable: true })
  pregnant?: boolean;
  @Field({ nullable: true })
  technician?: boolean;
  @Field({ nullable: true })
  techniciandescription?: string;
  @Field({ nullable: true })
  appointment?: string;
  @Field({ nullable: true })
  oftenfacials?: string;
  @Field({ nullable: true })
  oftenbody?: string;
  @Field({ nullable: true })
  cosmetic?: boolean;
  @Field({ nullable: true })
  finelines?: boolean;
  @Field({ nullable: true })
  wrinkles?: boolean;
  @Field({ nullable: true })
  dull?: boolean;
  @Field({ nullable: true })
  loss?: boolean;
  @Field({ nullable: true })
  dry?: boolean;
  @Field({ nullable: true })
  oily?: boolean;
  @Field({ nullable: true })
  pores?: boolean;
  @Field({ nullable: true })
  redness?: boolean;
  @Field({ nullable: true })
  sensit?: boolean;
  @Field({ nullable: true })
  dark?: boolean;
  @Field({ nullable: true })
  pimples?: boolean;
  @Field({ nullable: true })
  skin?: boolean;
  @Field({ nullable: true })
  other?: boolean;
  @Field({ nullable: true })
  otherextradescription?: string;
  @Field({ nullable: true })
  routine?: string;
  @Field({ nullable: true })
  cleanser?: boolean;
  @Field({ nullable: true })
  toner?: boolean;
  @Field({ nullable: true })
  moisturizer?: boolean;
  @Field({ nullable: true })
  spf?: boolean;
  @Field({ nullable: true })
  vitamin?: boolean;
  @Field({ nullable: true })
  scrubs?: boolean;
  @Field({ nullable: true })
  speciality?: boolean;
  @Field({ nullable: true })
  mask?: boolean;
  @Field({ nullable: true })
  supplements?: boolean;
  @Field({ nullable: true })
  exercise?: boolean;
  @Field({ nullable: true })
  scar?: boolean;
  @Field({ nullable: true })
  skinsensitive?: boolean;
  @Field({ nullable: true })
  pictures?: boolean;
  @Field({ nullable: true })
  consent?: number;
  @Field({ nullable: true })
  signature?: string;
  @Field(t => ParentConsentInput, { nullable: true })
  parentsConsent?: ParentConsentInput;
}
