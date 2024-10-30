import mongoose, { Document, Model, Schema } from "mongoose";

export interface IWebsite extends Document {
  id?: number;
  name: string;
  url: string;
  description?: string;
  tags: string[];
  categories: string;
  isFavorities?: boolean;
  email_address: string;
}

const WebsiteSchema: Schema = new Schema({
  id: { type: Number },
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  tags: { type: [String], required: true },
  categories: { type: String, required: true },
  isFavorities: { type: Boolean },
  email_address: { type: String, required: true }, // Updated schema to expect an array of strings
});

const Website: Model<IWebsite> =
  mongoose.models.Website ||
  mongoose.model<IWebsite>("Personal_Website", WebsiteSchema);

export default Website;
