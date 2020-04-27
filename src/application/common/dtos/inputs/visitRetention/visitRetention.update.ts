import { InputType, Field } from "type-graphql";
import { FLAG_RETENTION } from "../../../../../constants/modules/enums";

@InputType()
export class VisitRetentionUpdate {
    @Field({ nullable: true })
    userId?: string;
    @Field({ nullable: true })
    clientPhone?: string
    @Field({ nullable: true })
    treatment?: string;
    @Field({ nullable: true })
    flag?: FLAG_RETENTION;
}
