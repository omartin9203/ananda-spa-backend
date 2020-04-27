import * as mongoose from 'mongoose';
import { DEPARTMENT_MODEL_NAME } from '../../../../constants/constants';
import * as materializedPlugin from 'mongoose-materialized';

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now()},
    name: {type: String, required: true},
});

DepartmentSchema.plugin(materializedPlugin);

export const DepartmentFeature = {
    name: DEPARTMENT_MODEL_NAME,
    schema: DepartmentSchema,
};
