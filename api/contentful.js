const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
  const ENDPOINT = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}`;

  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Error fetching data from Contentful.");
  }
};
