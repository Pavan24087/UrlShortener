import express from "express";
import { nanoid } from "nanoid";
import Link from "../models/Link.js";

const router = express.Router();

// Create short URL
router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const shortCode = nanoid(7);

    const newLink = await Link.create({
      originalUrl: url,
      shortCode,
    });

    res.json({
      shortUrl: `http://localhost:3000/${shortCode}`,
      link: newLink
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
