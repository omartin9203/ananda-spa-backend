import * as mongoose from 'mongoose';
import { BASE_SETTING_MODEL_NAME, USER_MODEL_NAME, VISIT_RETENTION_MODEL_NAME } from '../../../../constants/modules/models_names';
import { FLAG_RETENTION } from '../../../../constants/modules/enums';
import { FLAG_RETENTION_VALUES } from '../../../../constants/modules/options';

const Schema = mongoose.Schema;

export const VisitRetentionSchema = new Schema({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: USER_MODEL_NAME,
    },
    date: {
        type: Date,
        required: true,
    },
    directoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: BASE_SETTING_MODEL_NAME,
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: BASE_SETTING_MODEL_NAME,
    },
    client: {
        name: {
            type: String,
            required: true,
        },
        phone: String,
    },
    flag: {
        type: String,
        default: FLAG_RETENTION.NORMAL,
        enum: FLAG_RETENTION_VALUES,
    },
    amount: String,
    tip: String,
    calendarId: String,
    otherInfo: [{
        type: String,
        required: true,
    }],
}, { timestamp: true });

export const VisitRetentionFeature = {
    name: VISIT_RETENTION_MODEL_NAME,
    schema: VisitRetentionSchema,
};
