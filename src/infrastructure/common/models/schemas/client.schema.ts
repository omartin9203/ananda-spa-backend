import * as mongoose from 'mongoose';
import { CLIENT_MODEL_NAME } from '../../../../constants/constants';

const Schema = mongoose.Schema;

export const ClientSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  ID: { type: Number, required: true },
  summary: { type: String, required: true },
  colorId: { type: String, required: true },
  streetaddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: String, required: true },


  email: { type: String, required: true },
  datebirth: { type: Date, required: false },
  imgSrc: {type: String, required: false },
  gender: { type: String, required: false },

}, { timestamp: true });

ClientSchema.index(
  {email: 'text', firstname: 'text', lastname: 'text', phone: 'text'},
  {weights: {email: 1, firstname: 2, lastname: 3, phone: 4}},
);

export const ClientFeature = {
  name: CLIENT_MODEL_NAME,
  schema: ClientSchema,
};
