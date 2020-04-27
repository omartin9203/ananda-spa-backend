import { InputType, Field } from "type-graphql";
import { IsString } from "class-validator";
import { FLAG_RETENTION } from "../../../../../constants/modules/enums";

@InputType()
export class VisitRetentionInput {
    @Field()
    user: string;
    @Field({ nullable: true })
    client?: string
    @Field()
    treatment: string;
    @Field({ nullable: true })
    flag?: FLAG_RETENTION;
}
