// // import express from "express";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";
// // import dotenv from "dotenv";
// // import { connectDB } from "./config/connectDB.js";
// // dotenv.config();
// // import userRoutes from "./routes/user.routes.js";
// // import sellerRoutes from "./routes/seller.routes.js";
// // import productRoutes from "./routes/product.routes.js";
// // import cartRoutes from "./routes/cart.routes.js";
// // import addressRoutes from "./routes/address.routes.js";
// // import orderRoutes from "./routes/order.routes.js";
// // import { upload } from "./config/cloudinary.js";
// // //import serverless from "serverless-http";

// // const app = express();

// // await connectDB();
// // await connectCloudinary();
// // // allow multiple origins
// // const allowedOrigins = process.env.URL;
// // //middlewares
// // app.use(cors({ origin: allowedOrigins, credentials: true }));
// // app.use(cookieParser());
// // app.use(express.json());

// // // Api endpoints
// // app.use("/images", express.static("uploads"));
// // app.use("/api/user", userRoutes);
// // app.use("/api/seller", sellerRoutes);
// // app.use("/api/product", productRoutes);
// // app.use("/api/cart", cartRoutes);
// // app.use("/api/address", addressRoutes);
// // app.use("/api/order", orderRoutes);


// // // export const handler = serverless(app);
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   connectDB();
// //   console.log(`Server is running on port ${PORT}`);
// // });




// // index.js

// // import express from "express";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";
// // import dotenv from "dotenv";
// // import { connectDB } from "./config/connectDB.js";
// // dotenv.config();

// // // Import all routes
// // import userRoutes from "./routes/user.routes.js";
// // import sellerRoutes from "./routes/seller.routes.js";
// // import productRoutes from "./routes/product.routes.js";
// // import cartRoutes from "./routes/cart.routes.js";
// // import addressRoutes from "./routes/address.routes.js";
// // import orderRoutes from "./routes/order.routes.js";

// // // 🔥 This automatically configures Cloudinary
// // import "./config/cloudinary.js"; 

// // const app = express();

// // // Connect MongoDB
// // await connectDB(); // ✅ Only this is needed

// // // Allow multiple origins
// // const allowedOrigins = process.env.URL;

// // // Middleware
// // app.use(cors({ origin: allowedOrigins, credentials: true }));
// // app.use(cookieParser());
// // app.use(express.json());

// // // API Routes
// // app.use("/images", express.static("uploads"));
// // app.use("/api/user", userRoutes);
// // app.use("/api/seller", sellerRoutes);
// // app.use("/api/product", productRoutes);
// // app.use("/api/cart", cartRoutes);
// // app.use("/api/address", addressRoutes);
// // app.use("/api/order", orderRoutes);

// // // Start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on port ${PORT}`);
// // });


// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import { connectDB } from "./config/connectDB.js";
// import userRoutes from "./routes/user.routes.js";
// import sellerRoutes from "./routes/seller.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import cartRoutes from "./routes/cart.routes.js";
// import addressRoutes from "./routes/address.routes.js";
// import orderRoutes from "./routes/order.routes.js";
// import "./config/cloudinary.js";

// dotenv.config();

// const app = express();
// // const allowedOrigins = process.env.URL;
// // Dummy change to trigger Vercel redeploy

// const cors = require("cors");

// const allowedOrigins = [
//   "https://gb-dumbling.vercel.app", // main production frontend
//   "https://gb-dumbling-2iol.vercel.app", // preview (old)
//   "https://gb-dumbling-2iol-git-master-developers-projects-05ab7480.vercel.app", // latest preview
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// }));


// app.use(cookieParser());
// app.use(express.json());

// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRoutes);
// app.use("/api/seller", sellerRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/address", addressRoutes);
// app.use("/api/order", orderRoutes);

// // Connect DB before exporting app
// await connectDB();

// export default app;



import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";
import "./config/cloudinary.js";

dotenv.config();

const app = express();

// ✅ Set allowed CORS origins from ENV (comma-separated)
const allowedOrigins = process.env.URL?.split(",") || [];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("❌ CORS Blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

// ✅ Connect to MongoDB once before exporting
await connectDB();

export default app;
