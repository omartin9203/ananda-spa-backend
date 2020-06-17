import * as mongoose from 'mongoose';
import { STATUS, STATUS_VALUES, USER_MODEL_NAME } from '../../../../constants/constants';
import * as bcrypt from 'bcryptjs';
import { COLOR_SETTING_MODEL_NAME } from '../../../../constants/modules/models_names';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    status: { type: String, default: STATUS.PENDING, enum: STATUS_VALUES },
    phone: { type: String, required: true },
    streetAddress: { type: String, required: true },
    // address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    imgSrc: { type: String, required: true },
    suspended: {
        isSuspended: { type: Boolean, default: false },
        endDate: Date,
    },
    departments: [{
        departmentId: { type: String, required: true },
    }],
    roles: [{
        type: String,
        required: true,
    }],
    retention: {
        total: {
            type: Number,
            default: 0,
        },
        important: {
            type: Number,
            default: 0,
        },
    },
    colorId: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: COLOR_SETTING_MODEL_NAME,
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
}, {timestamps: true});

UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(5);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

UserSchema.methods.validPassword = async function(candidatePassword) {
  const result = await bcrypt.compare(candidatePassword, this.password);
  return result;
};

export const UserFeature = {
  name: USER_MODEL_NAME,
  schema: UserSchema,
};
