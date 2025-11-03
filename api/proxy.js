import axios from "axios";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Missing URL parameter" });
    }

    const decodedUrl = decodeURIComponent(url);
    console.log("Proxying:", decodedUrl);

    const response = await axios.get(decodedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0", // mimic browser
        "Accept": "*/*",
      },
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Proxy failed", details: err.message });
  }
}
