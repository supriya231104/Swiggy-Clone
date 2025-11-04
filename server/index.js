import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Allow only your frontend origins
app.use(cors({
  origin: ["http://localhost:5173", "https://swiggy-clone-gules.vercel.app"],
  methods: ["GET"],
}));

app.get("/api/proxy", async (req, res) => {
  console.log("🔍 Incoming proxy request:", req.query);

  const targetUrl = decodeURIComponent(req.query.url || "");
  const token = req.query.token?.trim();
  const secret = process.env.SERVER_SECRET?.trim();

  // ✅ 1. Verify secret token
  if (!token || token !== secret) {
    return res.status(403).json({ error: "Unauthorized request - invalid or missing token" });
  }

  // ✅ 2. Verify Swiggy API URL
  if (!targetUrl.startsWith("https://www.swiggy.com/dapi/")) {
    return res.status(400).json({ error: "Invalid target URL" });
  }

  // ✅ 3. Prevent calling Swiggy with empty `input`
  if (targetUrl.includes("place-autocomplete") && targetUrl.includes("input=&")) {
    return res.status(400).json({ error: "Missing or empty input parameter" });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json,text/plain,*/*",
      },
    });

    const text = await response.text();

    // ✅ 4. Handle Swiggy’s non-JSON responses gracefully
    if (!response.ok) {
      console.error("❌ Swiggy API error:", response.status, text.slice(0, 200));
      return res.status(response.status).json({
        error: `Swiggy API returned ${response.status}`,
        details: text.slice(0, 200),
      });
    }

    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch (parseErr) {
      console.warn("⚠️ Response not JSON, sending as text");
      return res.status(200).send(text);
    }

  } catch (err) {
    console.error("❌ Proxy error:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
});

// ✅ Required for Vercel serverless function
export default app;
