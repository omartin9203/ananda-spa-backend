import { Schema } from 'mongoose';
import { USER_ROLES_VALUES } from '../../../../../constants/modules/options';

export const ServiceSettingSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  roles: [{
    type: String,
    required: true,
    enum: USER_ROLES_VALUES,
  }],
}, { discriminatorKey: 'type' });
