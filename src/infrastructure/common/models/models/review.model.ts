import { ResourceModel } from "../../../core/models/models/resource.model";
import { DIRECTORY } from "../../../../constants/modules/enums";
import { Field } from 'type-graphql';

export interface IAccredited {
    managerId: string;
    accreditedDate: Date;
    accreditedToEmployee: boolean;
    employeeId?: string;
    critical: boolean;
    bonus: number;
    payment: number;
}

export class ReviewModel extends ResourceModel {
    readonly client: string;
    readonly externalId?: string;
    readonly embedHTML?: string;
    readonly date: Date;
    readonly text: string;
    readonly stars: number;
    readonly directoryId: string;
    readonly accredited?: IAccredited;
}
