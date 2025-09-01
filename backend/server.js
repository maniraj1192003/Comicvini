import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();


const allowedOrigins = [
  "http://localhost:3000",             
  "https://comicvini.onrender.com"   
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


const API_KEY = process.env.API_KEY;  // set this in your .env locally or in Render/Heroku
const BASE_URL = "https://comicvine.gamespot.com/api";


app.get("/api/movies", async (req, res) => {
  try {
    const { name, studio, rating } = req.query;
    const filterQuery = name ? `&filter=name:${encodeURIComponent(name)}` : "";

    const response = await fetch(
      `${BASE_URL}/movies/?api_key=${API_KEY}&format=json&field_list=id,name,guid,deck,image,api_detail_url,studios,rating${filterQuery}`,
      { headers: { "User-Agent": "ComicApp" } }
    );

    let data = await response.json();

    if (studio && Array.isArray(data.results)) {
      data.results = data.results.filter(movie =>
        movie.studios?.some(s => s.name.toLowerCase().includes(studio.toLowerCase()))
      );
    }

    if (rating && Array.isArray(data.results)) {
      data.results = data.results.filter(movie =>
        movie.rating?.toLowerCase() === rating.toLowerCase()
      );
    }

    res.json(data);
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});


app.get("/api/search", async (req, res) => {
  const { query, resources } = req.query;
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const resourceList = resources
      ? resources.split(",").map(r => r.trim())
      : ["character", "movie", "power", "concept"];

    const url = `https://comicvine.gamespot.com/api/search/?api_key=${API_KEY}&format=json&query=${encodeURIComponent(query)}&resources=${resourceList.join(",")}`;

    const response = await fetch(url, { headers: { "User-Agent": "ComicWikiApp" } });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching search:", err);
    res.status(500).json({ error: "Failed to fetch from ComicVine" });
  }
});


app.get("/api/powers", async (req, res) => {
  try {
    const { name, page = 1 } = req.query;
    const limit = 100;
    const offset = (page - 1) * limit;
    const filter = name ? `&filter=name:${name}` : "";

    const response = await fetch(
      `${BASE_URL}/powers/?api_key=${API_KEY}&format=json&field_list=id,name,description,site_detail_url,image&limit=${limit}&offset=${offset}${filter}`,
      { headers: { "User-Agent": "ComicApp" } }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching powers:", err);
    res.status(500).json({ error: "Failed to fetch powers" });
  }
});


app.get("/api/concepts", async (req, res) => {
  try {
    const { name, sortOrder = "asc" } = req.query;
    let url = `${BASE_URL}/concepts/?api_key=${API_KEY}&format=json&field_list=id,name,deck,image,first_appeared_in_issue,start_year,count_of_issue_appearances,site_detail_url`;

    if (name) url += `&filter=name:${name}`;

    const response = await fetch(url, { headers: { "User-Agent": "comic-app" } });
    const data = await response.json();

    if (!data.results) return res.json({ results: [] });

    let results = data.results.sort((a, b) => {
      const yearA = parseInt(a.start_year) || 0;
      const yearB = parseInt(b.start_year) || 0;
      return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
    });

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch concepts" });
  }
});

app.get("/api/characters", async (req, res) => {
  try {
    let { name = "", gender = "", limit = 100, offset = 0, sort = "name:asc" } = req.query;
    limit = Math.min(Number(limit) || 100, 100);
    offset = Number(offset) || 0;

    const fieldList = "id,name,deck,image,gender,origin,publisher,real_name,site_detail_url";
    let filters = [];
    if (name) filters.push(`name:${name}`);
    if (gender) filters.push(`gender:${gender}`);
    const filterQuery = filters.length ? `&filter=${filters.join(",")}` : "";

    const url = `${BASE_URL}/characters/?api_key=${API_KEY}&format=json&field_list=${fieldList}&limit=${limit}&offset=${offset}&sort=${sort}${filterQuery}`;

    const response = await fetch(url, { headers: { "User-Agent": "ComicApp" } });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`ComicVine API returned ${response.status}: ${text}`);
    }

    const data = await response.json();
    const results = Array.isArray(data.results) ? data.results : [];
    res.json({ results });
  } catch (err) {
    console.error("Error fetching characters:", err.message);
    res.status(500).json({ error: "Failed to fetch characters", details: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
