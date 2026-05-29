import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import seedAdmin from "./seeds/seedAdmin.js";
import userRoutes from "./routes/useRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";

const jsonParser = bodyParser.json();

const app = express();

// Database Connection and seed admin - store promise so we can await it
const dbReady = connectDB()
  .then(() => seedAdmin())
  .catch((err) => {
    console.error("DB initialization failed:", err.message);
  });

app.use(express.json());
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// vercel options
const corsOptions = {
  origin: "*", // Allow all origins
  credentials: true, // Allow credentials
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204, // For legacy browser support
};
app.options("*", cors(corsOptions)); // Pre-flight request for all routes
app.use(cors(corsOptions));

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

// Ensure DB is connected before handling API requests
app.use("/api", async (req, res, next) => {
  try {
    await dbReady;
    next();
  } catch (err) {
    res.status(503).json({ message: "Database connection unavailable" });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Backward compatibility health endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
});

// Start listening only if not running on Vercel and run directly
import { fileURLToPath } from "url";
const isDirectRun = process.argv[1] && (process.argv[1] === fileURLToPath(import.meta.url));
if (isDirectRun || (!process.env.VERCEL && process.env.NODE_ENV !== "test")) {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}/api`),
  );
}

export default app;
