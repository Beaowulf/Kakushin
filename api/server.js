require("dotenv").config();
const fetch = require("node-fetch");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/check-website-health", async (req, res) => {
  const { url, device } = req.body; // Assume device is optional and defaults to 'desktop' if not provided
  const apiEndpoint = "https://api.siterelic.com/lighthouse";
  const apiKey = process.env.SITERELIC_API_KEY;

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ url, device: device || "desktop" }),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
