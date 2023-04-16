import mongoose from "mongoose";
const fileSchema = mongoose.Schema({
  name: String,

  createdAt: Date,
  data: String,
  extension: String,
  lastAccess: Date,

  parent: String,
  path: [],
  updatedAt: Date,
  url: String,
});

const File = mongoose.model("file", fileSchema);
export default File;
