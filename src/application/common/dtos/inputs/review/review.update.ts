import { InputType, Field } from "type-graphql";

@InputType()
export class ReviewUpdate {
    @Field({ nullable: true })
    client?: string;
    @Field({ nullable: true })
    date?: Date;
    @Field({ nullable: true })
    text?: string;
    @Field({ nullable: true })
    stars?: number;
    @Field({ nullable: true })
    directoryId?: string;
    //@Field({ nullable: true })
    //accredited?: AccreditedUpdate;
}
