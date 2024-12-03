const fetch = require("node-fetch");

export default async function handler(req, res) {
  const API_KEY = process.env.LCW_API_KEY; // Use environment variable for API key
  const API_ENDPOINT = "https://api.livecoinwatch.com/coins/map";

  // List of coin codes to fetch
  const coinCodes = ["BTC", "ETH", "XRP", "SOL", "BNB", "USDC", "DOGE", "ADA"];

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "USD",
        codes: coinCodes,
        meta: true,
      }),
    });

    const data = await response.json();
    const prices = data.map(coin => ({
      name: coin.code,
      price: coin.rate,
    }));

    res.status(200).json(prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}