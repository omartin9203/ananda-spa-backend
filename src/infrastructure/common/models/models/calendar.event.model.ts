import { ResourceModel } from '../../../core/models/models/resource.model';
import { CALENDAR_EVENT_MODEL_NAME } from '../../../../constants/constants';
import { Field } from 'type-graphql';

export class CalendarEventModel extends ResourceModel {
  readonly summary: string;
  readonly description?: string;
  readonly colorId: string;
  readonly start: string;
  readonly end: string;
  readonly status: 'confirmed' | 'tentative' | 'cancelled';

}
