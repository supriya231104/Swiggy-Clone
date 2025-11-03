import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Allow only your frontend origin
app.use(cors({
  origin: ["http://localhost:5173", "https://swiggy-clone-gules.vercel.app"],
  methods: ["GET"],
}));

app.get("/api/proxy", async (req, res) => {
  console.log("🔍 Incoming proxy request:", req.query);
  const targetUrl = decodeURIComponent(req.query.url || "");
  const token = req.query.token?.trim();
  const secret = process.env.SERVER_SECRET?.trim();

  // ✅ Verify secret token
  if (token !== secret) {
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
    console.error("❌ Proxy error:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
});

// ❌ REMOVE this line:
// app.listen(PORT, () => console.log(...));

// ✅ ADD this instead:
export default app;
