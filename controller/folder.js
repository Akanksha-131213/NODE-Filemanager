import Folder from "../folder-schema.js";

export const getFolders = async (req, res) => {
  const folder = await Folder.find({});

  res.status(201).json(folder);
};

export const deleteFolder = async (req, res) => {
  try {
    await Folder.deleteOne({ _id: req.params.id });
    res.send(req.params.id);
  } catch (error) {
    console.log(error);
  }
};
export const createFolders = async (req, res) => {
  const folder = req.body;
  const newFolder = new Folder(folder);
  console.log(folder);
  try {
    await newFolder.save();
    res.status(201).json(newFolder);
  } catch (error) {
    console.log(error);
  }
};
