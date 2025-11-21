import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import shortenRoute from "./routes/shorten.js";
import statsRoute from "./routes/stats.js";
import linksRoute from "./routes/links.js";
import Link from "./models/Link.js";

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/shorten", shortenRoute);
app.use("/api/stats", statsRoute);
app.use("/api/links", linksRoute);

// Redirect route
app.get("/:code", async (req, res) => {
  const link = await Link.findOne({ shortCode: req.params.code });

  if (!link) return res.status(404).send("Short URL not found");

  link.clicks++;
  await link.save();

  res.redirect(link.originalUrl);
});

// Start server
app.listen(process.env.PORT, () => 
    console.log("Server running on Port 3000")
);
