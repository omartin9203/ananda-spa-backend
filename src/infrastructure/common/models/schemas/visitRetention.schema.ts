import * as mongoose from 'mongoose';
import { USER_MODEL_NAME, VISIT_RETENTION_MODEL_NAME } from '../../../../constants/modules/models_names';
import { TREATMENT_VALUES } from '../../../../constants/constants';
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
    clientPhone: {
        type: String,
    },
    treatment: {
        type: String,
        required: true,
        enum: TREATMENT_VALUES
    },
    flag: {
        type: String,
        default: FLAG_RETENTION.NORMAL,
        enum: FLAG_RETENTION_VALUES,
    }
}, { timestamp: true });

export const VisitRetentionFeature = {
    name: VISIT_RETENTION_MODEL_NAME,
    schema: VisitRetentionSchema,
};
