import { Schema } from 'mongoose';
import { BASE_SETTING_MODEL_NAME } from '../../../../../constants/modules/models_names';

const BaseSettingSchema = new Schema(
    {
        createdAt: { type: Date, default: Date.now() },
        updatedAt: { type: Date, default: Date.now() },
    },
    { timestamps: true, discriminatorKey: 'type' },
);

export const BaseSettingFeature = {
    name: BASE_SETTING_MODEL_NAME,
    schema: BaseSettingSchema,
};