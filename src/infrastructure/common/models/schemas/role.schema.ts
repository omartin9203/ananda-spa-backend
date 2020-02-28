import * as mongoose from 'mongoose';
import { ROLE_MODEL_NAME } from '../../../../constants';
import * as materializedPlugin from 'mongoose-materialized';

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now()},
    name: {type: String, required: true},
});

RoleSchema.plugin(materializedPlugin);

export const RoleFeature = {
    name: ROLE_MODEL_NAME,
    schema: RoleSchema,
};
