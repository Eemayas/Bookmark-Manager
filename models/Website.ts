import { PersonalWebsiteType } from "@/app/types";
import mongoose, { Document, Model, Schema } from "mongoose";

const WebsiteSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  tags: { type: [String], required: true },
  folderPath: { type: String, required: true },
  isFavorities: { type: Boolean },
  email_address: { type: String, required: true }, // Updated schema to expect an array of strings
});

const Website: Model<PersonalWebsiteType> =
  mongoose.models.Personal_Website ||
  mongoose.model<PersonalWebsiteType>("Personal_Website", WebsiteSchema);

export default Website;
