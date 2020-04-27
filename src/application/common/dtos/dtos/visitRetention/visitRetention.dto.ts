import { ResourceDto } from "../../../../core/dtos/resource.dto";
import { ObjectType, Field } from "type-graphql";
import { UserDto } from "../user/user.dto";
import { FLAG_RETENTION } from "../../../../../constants/modules/enums";

@ObjectType()
export class VisitRetentionDto extends ResourceDto {
    @Field(type => UserDto, { nullable: true })
    readonly user?: UserDto;
    @Field({ nullable: true })
    readonly clientPhone?: string;
    @Field()
    readonly treatment: string;
    @Field()
    readonly flag: FLAG_RETENTION;
}