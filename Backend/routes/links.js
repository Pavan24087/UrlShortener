import express from "express";
import Link from "../models/Link.js";

const router = express.Router();

// List all links
router.get("/", async (req, res) => {
  const links = await Link.find().sort("-createdAt");
  res.json(links);
});

// Delete a link
router.delete("/:code", async (req, res) => {
  const deleted = await Link.findOneAndDelete({ shortCode: req.params.code });
  if (!deleted) return res.status(404).json({ message: "Link not found" });

  res.json({ message: "Link deleted successfully" });
});

// Update original URL
router.put("/:code", async (req, res) => {
  const { newUrl } = req.body;

  const updated = await Link.findOneAndUpdate(
    { shortCode: req.params.code },
    { originalUrl: newUrl },
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Link not found" });

  res.json(updated);
});

export default router;
