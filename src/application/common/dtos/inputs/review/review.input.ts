import { ObjectType, Field, InputType } from "type-graphql";
import { DIRECTORY } from "../../../../../constants/modules/enums";
import { AccreditedInputType } from "./accredited/accredited.input";

@InputType()
export class ReviewInput {
    @Field()
    client: string;
    @Field()
    reviewId: string;
    @Field()
    embedHTML?: string;
    @Field()
    date: Date;
    @Field()
    text: string;
    @Field()
    stars: number;
    @Field()
    directoryId: string;
    @Field({ nullable: true, defaultValue: null })
    accredited?: AccreditedInputType;
}
