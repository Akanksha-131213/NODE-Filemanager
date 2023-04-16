import mongoose from "mongoose";
const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@filemanagementapp.pwebvdc.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
    });
    console.log("SuccessFUL DB connection.");
  } catch (error) {
    console.log("Error while connection.", error);
  }
};

export default Connection;
