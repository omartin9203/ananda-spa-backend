import {
  BASEFORM_MODEL_NAME,
  CLIENT_MODEL_NAME,
  DIAGNOSTIC_MODEL_NAME,
  DIAGNOSTIC_SETTINGS,
  USER_MODEL_NAME,
  VISIT_MODEL_NAME,
} from '../../../../constants/constants';
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VisitSchema = new Schema({
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
  photos: [{
    type: Schema.Types.ObjectId,
    required: true,
  }],
  notes: [{
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    performedById: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: USER_MODEL_NAME,
    },
  }],
  diagnosticId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: DIAGNOSTIC_MODEL_NAME,
  },
//   diagnostic: {
//     // region First Time Skin Analysis
//     typeOfKind: {
//       type: String,
//       required: true,
//       enum: DIAGNOSTIC_SETTINGS.TYPES_OF_KIND.options,
//     },
//     fitzpatrickClassification: {
//       type: String,
//       required: true,
//       enum: DIAGNOSTIC_SETTINGS.Fitzpatrick_classification.options,
//     },
//     conditionsAndConcerns: [{
//       type: String,
//       required: true,
//       enum: DIAGNOSTIC_SETTINGS.Conditions_and_concerns.options,
//     }],
//     texture: {
//       type: String,
//       required: true,
//       enum: DIAGNOSTIC_SETTINGS.Texture.options,
//     },
// //  endregion
//     //region Services
//     todaysDate: Date,
//     typeOfTreatment: String,
//     specificClientsConcerns: String,
//     notesOrRemarks: String,
//     productsUsedToday: [{
//       type: String,
//       required: true,
//       enum: DIAGNOSTIC_SETTINGS.Products_used_today.options,
//     }],
//     extractions: Boolean,
//     steam: Boolean,
//     highFrecuency: Boolean,
//     todaysRecommendedProducts: {
//       daytime: String,
//       nightime: String,
//     },
// //endregion
//   },
  formId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: BASEFORM_MODEL_NAME,
  },

});

export const VisitFeature = {
  name: VISIT_MODEL_NAME,
  schema: VisitSchema,
};
