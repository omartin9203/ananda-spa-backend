import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class RetentionUserDto {
    @Field()
    total: number;
    @Field()
    important: number;
}
