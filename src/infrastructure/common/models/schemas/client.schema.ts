import * as mongoose from 'mongoose';
import { CLIENT_MODEL_NAME } from '../../../../constants';

const Schema = mongoose.Schema;

export const ClientSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  // address: {
  streetaddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },
  // },

  email: { type: String, required: true },
  datebirth: { type: Date, required: true },
  imgSrc: {type: String, required: false },
  gender: { type: String, required: true },

}, { timestamp: true });

ClientSchema.index(
  {email: 'text', firstname: 'text', lastname: 'text', phone: 'text'},
  {weights: {email: 1, firstname: 2, lastname: 3, phone: 4}},
);

export const ClientFeature = {
  name: CLIENT_MODEL_NAME,
  schema: ClientSchema,
};
