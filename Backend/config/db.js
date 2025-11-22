// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URI);
//     console.log("MongoDB Connected");
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// export default connectDB;




// import { connect } from "mongoose";

// let isConnected;

// const connectDatabase = async () => {
//   if (isConnected) return;
//   try {
//     await connect(process.env.DATABASE_URI);
//     console.log("MongoDB Connected");
//     isConnected = true;
//   } catch (error) {
//     console.log("Database is not connected", error.message);
//   }
// };

// export default connectDatabase;



import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;

