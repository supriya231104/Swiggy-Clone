import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Allow only your frontend origin
app.use(cors({
  origin: ["http://localhost:5173", "https://swiggy-clone-gules.vercel.app"],
  methods: ["GET"],
}));

app.get("/api/proxy", async (req, res) => {
  const targetUrl = decodeURIComponent(req.query.url || "");
  const token = req.query.token?.trim();
  const secret = process.env.SERVER_SECRET?.trim();

  if (token !== secret) {
    return res.status(403).json({ error: "Unauthorized request" });
  }

  if (!targetUrl.startsWith("https://www.swiggy.com/dapi/")) {
    return res.status(403).json({ error: "Invalid target URL" });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json,text/plain,*/*",
      },
    });

    const text = await response.text();

    try {
      const json = JSON.parse(text);
      res.json(json);
    } catch {
      res.send(text);
    }
  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
});

// ❌ REMOVE app.listen()
// ✅ ADD THIS INSTEAD:
export default app;
