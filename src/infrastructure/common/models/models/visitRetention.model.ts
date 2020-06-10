import { ResourceModel } from '../../../core/models/models/resource.model';
import { FLAG_RETENTION } from '../../../../constants/modules/enums';

export class VisitRetentionModel extends ResourceModel {
    readonly userId: string;
    readonly date: Date;
    readonly directoryId: string;
    readonly serviceId?: string;
    readonly flag: FLAG_RETENTION;
    readonly client: {
        name: string;
        phone?: string;
    };
    readonly amount?: string;
    readonly tip?: string;
    readonly calendarId?: string;
}
