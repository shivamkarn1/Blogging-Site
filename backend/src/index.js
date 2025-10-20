import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import adminRouter from "./routes/admin.routes.js";
import blogRouter from "./routes/blog.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT || 8000;

// Connect Database
connectDB();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cors());

// API endpoints
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
