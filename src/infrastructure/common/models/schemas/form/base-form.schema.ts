import { Schema } from 'mongoose';
import { CLIENT_MODEL_NAME, BASEFORM_MODEL_NAME } from '../../../../../constants';

const BaseFormSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: CLIENT_MODEL_NAME,
    },
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now()},

  },
  { timestamps: true, discriminatorKey: 'type' },
);

// export { BaseFormSchema };
export const BaseFormFeature = {
  name: BASEFORM_MODEL_NAME,
  schema: BaseFormSchema,
};
