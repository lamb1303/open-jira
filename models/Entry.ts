import mongoose, { Model, Schema } from "mongoose";
import { Entry } from "../interfaces/entry";

export interface EntryProps extends Entry {}

const entrySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} Not Access",
    },
    default: 'pending'
  },
});

const entryModel: Model<EntryProps> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default entryModel;
