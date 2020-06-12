import { Schema } from 'mongoose';

export const ColorSettingSchema: Schema = new Schema({
  colorId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hexcode: {
    type: String,
    required: true,
  },
}, { discriminatorKey: 'type' });


