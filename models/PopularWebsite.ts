import mongoose, { Document, Model, Schema, model, models } from "mongoose";

const websiteSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, default: "" },
  tags: { type: [String], required: true },
  categories: { type: String, required: true },
});

const popularLinksSchema = new Schema({
  data: { type: Map, of: [websiteSchema] }, // Allows dynamic categories
});

const PopularLinks =
  models.PopularLinks || model("Popular_Links", popularLinksSchema);

export default PopularLinks;
