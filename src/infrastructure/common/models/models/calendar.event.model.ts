import { ResourceModel } from '../../../core/models/models/resource.model';
import { CALENDAR_EVENT_MODEL_NAME } from '../../../../constants/constants';

export class CalendarEventModel extends ResourceModel {
  readonly ID: number;
  readonly summary: string;
  readonly colorId: string;
  readonly createdate: Date;
  static ModelName = CALENDAR_EVENT_MODEL_NAME;
}
