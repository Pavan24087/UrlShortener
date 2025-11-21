import express from "express";
import Link from "../models/Link.js";

const router = express.Router();

// Get click statistics
router.get("/:code", async (req, res) => {
  try {
    const link = await Link.findOne({ shortCode: req.params.code });

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.json({
      originalUrl: link.originalUrl,
      clicks: link.clicks,
      createdAt: link.createdAt,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
