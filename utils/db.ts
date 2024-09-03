import mongoose from "mongoose";

let isConnected: boolean = false; //Track the connection

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment");
}

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "nextjs-authorization-learn",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};
