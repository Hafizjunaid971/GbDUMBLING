import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";

// Import all routes
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";

// Configure Cloudinary
import "./config/cloudinary.js";

dotenv.config();

const app = express();

// Normalize origins by removing trailing slashes
const allowedOrigins = (process.env.URL || "").split(",").map(origin => origin.trim().replace(/\/$/, ""));

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., Postman) or from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, origin || true); // Return origin without trailing slash
    }
    console.error("❌ CORS Blocked:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log("Request Origin:", req.get("Origin"));
  console.log("Request Cookies:", req.cookies);
  next();
});

app.use(cookieParser());
app.use(express.json());

// API Routes
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

// Test endpoint to verify backend
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err);
  });

export default app;




//local

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import { connectDB } from "./config/connectDB.js";

// // Routes
// import userRoutes from "./routes/user.routes.js";
// import sellerRoutes from "./routes/seller.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import cartRoutes from "./routes/cart.routes.js";
// import addressRoutes from "./routes/address.routes.js";
// import orderRoutes from "./routes/order.routes.js";

// // Cloudinary
// import "./config/cloudinary.js";

// dotenv.config();

// const app = express();

// // ✅ Add local URL for development
// const allowedOrigins = (process.env.URL || "")
//   .split(",")
//   .map(origin => origin.trim().replace(/\/$/, ""));
// allowedOrigins.push("http://localhost:5173"); // add local frontend

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       return callback(null, origin || true);
//     }
//     console.error("❌ CORS Blocked:", origin);
//     return callback(new Error("Not allowed by CORS"));
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// app.use(cookieParser());
// app.use(express.json());

// // Logging for debug
// app.use((req, res, next) => {
//   console.log("Request Origin:", req.get("Origin"));
//   console.log("Request Cookies:", req.cookies);
//   next();
// });

// // Routes
// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRoutes);
// app.use("/api/seller", sellerRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/address", addressRoutes);
// app.use("/api/order", orderRoutes);

// // Test route
// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend is working locally!" });
// });

// // Connect DB and start server
// connectDB()
//   .then(() => {
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Local server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error("Failed to connect to MongoDB:", err);
//   });

// export default app;
