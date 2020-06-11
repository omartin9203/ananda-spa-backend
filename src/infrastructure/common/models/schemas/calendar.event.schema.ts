import * as mongoose from 'mongoose';
import { CALENDAR_EVENT_MODEL_NAME, CLIENT_MODEL_NAME } from '../../../../constants/constants';

const Schema = mongoose.Schema;

export const CalendarEventSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  summary: {type: String, required: true},
  description: {type: String, required: false},
  colorId: {type: String, required: true},
  start: {type: String, required: true},
  end: {type: String, required: true},
  status: {type: String, enum: ['confirmed', 'tentative', 'cancelled'], required: true},
}, { timestamp: true });

export const CalendarEventFeature = {
  name: CALENDAR_EVENT_MODEL_NAME,
  schema: CalendarEventSchema,
};
