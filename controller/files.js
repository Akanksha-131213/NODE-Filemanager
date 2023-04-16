import File from "../file-schema.js";

export const getFiles = async (req, res) => {
  const file = await File.find({});

  res.status(201).json(file);
};

export const deleteFile = async (req, res) => {
  try {
    await File.deleteOne({ _id: req.params.id });
    res.send(req.params.id);
  } catch (error) {
    console.log(error);
  }
};
export const createFiles = async (req, res) => {
  const file = req.body;
  const newFile = new File(file);
  console.log(file);
  try {
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    console.log(error);
  }
};

export const updateFile = async (req, res) => {
  const da = req.body;
  try {
    await File.updateOne({ _id: req.params.id }, { $set: da });
    res.send("yes");
  } catch (error) {
    console.log(error);
  }
};
