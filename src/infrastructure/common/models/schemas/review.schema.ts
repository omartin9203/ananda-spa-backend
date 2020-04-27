import * as mongoose from 'mongoose';
import { USER_MODEL_NAME, REVIEW_MODEL_NAME } from '../../../../constants/modules/models_names';
import { TREATMENT_VALUES } from '../../../../constants/constants';
import { DIRECTORY_VALUES } from '../../../../constants/modules/options';

const Schema = mongoose.Schema;

export const ReviewSchema = new Schema({
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },

    client: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    text: {
        type: String,
        default: '',
    },
    stars: {
        type: Number,
        required: true,
    },
    directoryId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    accredited: {
        managerId: {
            type: Schema.Types.ObjectId,
            ref: USER_MODEL_NAME,
        },
        accreditedDate: {
            type: Date,
        },
        accreditedToEmployee: {
            type: Boolean,
        },
        employeeId: {
            type: Schema.Types.ObjectId,
            ref: USER_MODEL_NAME,
        },
        critical: {
            type: Boolean,
        },
        bonus: {
            type: Number,
        },
        payment: {
            type: Number,
        },
    },
});

export const ReviewFeature = {
    name: REVIEW_MODEL_NAME,
    schema: ReviewSchema,
};
