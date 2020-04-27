import { Field, InputType, InterfaceType, ObjectType } from "type-graphql";

@InputType()
export class AccreditedUpdate {
    @Field({ nullable: true })
    managerId?: string;
    @Field({ nullable: true })
    accreditedDate?: Date;
    @Field({ nullable: true })
    accreditedToEmployee?: boolean;
    @Field({ nullable: true })
    employeeId?: string;
    @Field({ nullable: true })
    critical?: boolean;
    //@Field({ nullable: true })
    //bonus?: number;
    //@Field({ nullable: true })
    //payment?: number;
}