import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI)
    return console.error("MONGODB_URI is not defined");

  if (isConnected) return console.log("=>using existing database connection");
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("MongoDB connected successfully");
        isConnected = true;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });
  } catch (error) {
    console.error(error);
  }
};
