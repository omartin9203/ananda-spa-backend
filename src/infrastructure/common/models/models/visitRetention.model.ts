import { ResourceModel } from "../../../core/models/models/resource.model";
import { TREATMENT } from "../../../../constants/constants";
import { FLAG_RETENTION } from "../../../../constants/modules/enums";

export class VisitRetentionModel extends ResourceModel {
    readonly userId: string;
    readonly clientPhone?: string;
    readonly treatment: TREATMENT;
    readonly flag: FLAG_RETENTION;
}
