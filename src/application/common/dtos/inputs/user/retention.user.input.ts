import { InputType, Field } from "type-graphql";

@InputType()
export class RetentionUserInput {
    @Field({ nullable: true })
    total?: number;
    @Field({ nullable: true })
    important?: number;
}
