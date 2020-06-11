import * as mongoose from 'mongoose';
import { CALENDAR_EVENT_MODEL_NAME, CLIENT_MODEL_NAME } from '../../../../constants/constants';

const Schema = mongoose.Schema;

export const CalendarEventSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  createdate: { type: Date, required: true },
}, { timestamp: true });

export const CalendarEventFeature = {
  name: CALENDAR_EVENT_MODEL_NAME,
  schema: CalendarEventSchema,
};
