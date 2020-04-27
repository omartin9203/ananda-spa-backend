import { InputType, Field } from "type-graphql";

@InputType()
export class ReviewSettingUpdate {
    @Field({ nullable: true })
    directoryName?: string;
    @Field({ nullable: true })
    bonus?: number;
    @Field({ nullable: true })
    payment?: number;
    @Field({ nullable: true })
    percentage?: number;
    @Field({ nullable: true })
    minOverall?: number;
    @Field({ nullable: true })
    icon?: string;
}
