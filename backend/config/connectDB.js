// import mongoose, { mongo } from "mongoose";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGOURI);
//     console.log("MongoDB connected ");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1); // Exit the process with failure
//   }
// };

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
