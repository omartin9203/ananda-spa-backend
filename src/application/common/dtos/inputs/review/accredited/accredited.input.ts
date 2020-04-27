import {Field, InputType, InterfaceType, ObjectType} from "type-graphql";

@InputType()
export class AccreditedInputType {
    @Field({ nullable: true })
    managerId?: string;
    @Field()
    accreditedDate: Date;
    @Field()
    accreditedToEmployee: boolean;
    @Field({ nullable: true })
    employeeId?: string;
    @Field({ nullable: true })
    critical?: boolean;
    @Field({ nullable: true })
    bonus?: number;
    @Field({ nullable: true })
    payment?: number;
}
