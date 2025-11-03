import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Allow only your frontend origin
app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
  methods: ["GET"],
}));

app.get("/api/proxy", async (req, res) => {
  const targetUrl = decodeURIComponent(req.query.url || "");
  // const token = req.query.token;
  const token = req.query.token?.trim();
const secret = process.env.SERVER_SECRET?.trim();
  // ✅ Verify secret token
  if (token !== process.env.SERVER_SECRET) {
    return res.status(403).json({ error: "Unauthorized request" });
  }

  // ✅ Verify target URL
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
    console.error(err);
    res.status(500).json({ error: "Proxy failed" });
  }
});

app.listen(PORT, () => console.log(`✅ Secure proxy running on port ${PORT}`));
