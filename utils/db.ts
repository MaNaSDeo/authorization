import mongoose from "mongoose";

let isConnected: boolean = false; //Track the connection

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "share_prompt",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};
