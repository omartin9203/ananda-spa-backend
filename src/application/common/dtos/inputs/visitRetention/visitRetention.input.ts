import { InputType, Field } from "type-graphql";
import { FLAG_RETENTION } from "../../../../../constants/modules/enums";
import { TREATMENT } from '../../../../../constants/constants';

@InputType()
export class VisitRetentionInput {
    @Field()
    user: string;
    @Field({ nullable: true })
    client?: string;
    @Field()
    treatment: TREATMENT;
    @Field({ nullable: true })
    flag?: FLAG_RETENTION;
}
