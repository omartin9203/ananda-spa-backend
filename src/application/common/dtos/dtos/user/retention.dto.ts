import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class RetentionUserDto {
    @Field({defaultValue: 0})
    total: number;
    @Field({defaultValue: 0})
    important: number;
}
