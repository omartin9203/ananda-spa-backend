import { Schema } from 'mongoose';
import { BASE_SETTING_MODEL_NAME } from '../../../../../constants/modules/models_names';

export const RetentionSettingSchema: Schema = new Schema({
  availability: {
    available: {
      match: [{
        type: String,
        required: true,
      }],
    },
    unavailable: {
      match: [{
        type: String,
        required: true,
      }],
    },
  },
  treatment: {
    services: {
      setting: [{
        serviceId: {
          required: true,
          type: Schema.Types.ObjectId,
          ref: BASE_SETTING_MODEL_NAME,
        },
        match: [{
          type: String,
          required: true,
        }],
      }],
      default: {
        type: Schema.Types.ObjectId,
        ref: BASE_SETTING_MODEL_NAME,
      },
    },
    request: {
      personalMatch: [{
        type: String,
        required: true,
      }],
      requestMatch: [{
        type: String,
        required: true,
      }],
      default: {
        type: Boolean,
        default: false,
      },
    },
    amount: {
      setting: [{
        match: [{
          type: String,
          required: true,
        }],
        type: {
          type: String,
          required: true,
          enum: ['string', 'number'],
        },
        display: {
          type: String,
        },
      }],
      default: String,
    },
    directory: {
      setting: [{
        directoryId: {
          required: true,
          type: Schema.Types.ObjectId,
          ref: BASE_SETTING_MODEL_NAME,
        },
        match: [{
          type: String,
          required: true,
        }],
      }],
      default: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: BASE_SETTING_MODEL_NAME,
      },
    },
    tip: {
      setting: [{
        match: [{
          type: String,
          required: true,
        }],
        type: {
          type: String,
          required: true,
          enum: ['string', 'number'],
        },
        display: {
          type: String,
        },
      }],
      default: Object,
    },
  },
}, { discriminatorKey: 'type' });
