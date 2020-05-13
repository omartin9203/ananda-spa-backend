import { Schema } from 'mongoose';

export const ReviewSettingSchema: Schema = new Schema({
    directoryName: {
        type: String,
        required: true,
    },
    bonus: {
        type: Number,
        default: 1,
    },
    payment: {
        type: Number,
        default: 0,
    },
    percentage: {
        type: Number,
        default: 0,
    },
    minOverall: {
        type: Number,
        default: 0,
    },
    icon: {
        type: String,
    },
    iconReview: {
        type: String,
    },
    iconColored: {
        type: String,
    },
}, { discriminatorKey: 'type' });
