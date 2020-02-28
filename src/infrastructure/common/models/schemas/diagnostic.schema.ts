import * as mongoose from 'mongoose';
import { DIAGNOSTIC_MODEL_NAME, DIAGNOSTIC_SETTINGS, CLIENT_MODEL_NAME, USER_MODEL_NAME } from '../../../../constants';

const Schema = mongoose.Schema;

export const DiagnosticSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  clientId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: CLIENT_MODEL_NAME,
  },
  performedById: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER_MODEL_NAME,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  // region First Time Skin Analysis
  typeOfKind: {
      type: String,
      required: true,
      enum: DIAGNOSTIC_SETTINGS.TYPES_OF_KIND.options,
  },
  fitzpatrickClassification: {
    type: String,
    required: true,
    enum: DIAGNOSTIC_SETTINGS.Fitzpatrick_classification.options,
  },
  conditionsAndConcerns: [{
    type: String,
    required: true,
    enum: DIAGNOSTIC_SETTINGS.Conditions_and_concerns.options,
  }],
  texture: {
    type: String,
    required: true,
    enum: DIAGNOSTIC_SETTINGS.Texture.options,
  },
//  endregion
  //region Services
  todaysDate: Date,
  typeOfTreatment: String,
  specificClientsConcerns: String,
  notesOrRemarks: String,
  productsUsedToday: [{
    type: String,
    required: true,
    enum: DIAGNOSTIC_SETTINGS.Products_used_today.options,
  }],
  extractions: Boolean,
  steam: Boolean,
  highFrecuency: Boolean,
  todaysRecommendedProducts: {
    daytime: String,
    nightime: String,
  },
//endregion
}, { timestamp: true });

export const DiagnosticFeature = {
  name: DIAGNOSTIC_MODEL_NAME,
  schema: DiagnosticSchema,
};
