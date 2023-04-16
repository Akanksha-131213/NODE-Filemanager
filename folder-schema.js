import mongoose from "mongoose";

const folderSchema = mongoose.Schema({
  name: String,
  createdAt: Date,
  lastAccess: Date,
  parent: String,
  path: [],
  updatedAt: Date,
});

const Folder = mongoose.model("folder", folderSchema);
export default Folder;
