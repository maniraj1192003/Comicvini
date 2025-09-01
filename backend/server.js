import express from "express";
import fetch from "node-fetch";
import axios from 'axios';


import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "19b4269d41f54c390f7d5080c1b9c8691ac024f3"; 
const BASE_URL = "https://comicvine.gamespot.com/api";







app.get("/api/movies", async (req, res) => {
  try {
    const { name, studio, rating } = req.query;

    // Build ComicVine filter string for name only
    const filterQuery = name ? `&filter=name:${encodeURIComponent(name)}` : "";

    const response = await fetch(
      `${BASE_URL}/movies/?api_key=${API_KEY}&format=json&field_list=id,name,guid,deck,image,api_detail_url,studios,rating${filterQuery}`,
      { headers: { "User-Agent": "ComicApp" } }
    );

    let data = await response.json();

    // Local filtering for studio
    if (studio && Array.isArray(data.results)) {
      data.results = data.results.filter(movie =>
        movie.studios?.some(s => s.name.toLowerCase().includes(studio.toLowerCase()))
      );
    }

    // Local filtering for rating
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

// -------------------
// Movie detail endpoint
// -------------------



// Search Endpoint
app.get("/api/search", async (req, res) => {
  const { query, resources } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const resourceList = resources
      ? resources.split(",").map((r) => r.trim())
      : ["character", "movie", "power", "concept"];

    const url = `https://comicvine.gamespot.com/api/search/?api_key=${API_KEY}&format=json&query=${encodeURIComponent(
      query
    )}&resources=${resourceList.join(",")}`;

    const response = await fetch(url, {
      headers: { "User-Agent": "ComicWikiApp" },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from ComicVine:", error);
    res.status(500).json({ error: "Failed to fetch from ComicVine" });
  }
});



//All powers

app.get("/api/powers", async (req, res) => {
  try {
    const { name, page = 1 } = req.query;
    const limit = 100; // max allowed
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






// All concepts


app.get("/api/concepts", async (req, res) => {
  try {
    const { name, sortOrder = "asc" } = req.query;

    // Build ComicVine API URL
    let url = `https://comicvine.gamespot.com/api/concepts/?api_key=${API_KEY}&format=json&field_list=id,name,deck,image,first_appeared_in_issue,start_year,count_of_issue_appearances,site_detail_url`;

    if (name) {
      url += `&filter=name:${name}`;
    }

    const response = await fetch(url, {
      headers: { "User-Agent": "comic-app" },
    });

    const data = await response.json();

    if (!data.results) {
      return res.json({ results: [] });
    }

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









//All charcters
app.get("/api/characters", async (req, res) => {
  try {
    let { name = "", gender = "", limit = 100, offset = 0, sort = "name:asc" } = req.query;

    // Ensure limit and offset are numbers
    limit = Math.min(Number(limit) || 100, 100); // max 100
    offset = Number(offset) || 0;

    // Build field_list (you can add/remove fields as needed)
    const fieldList = "id,name,deck,image,gender,origin,publisher,real_name,site_detail_url";

    // Build filter string
    let filters = [];
    if (name) filters.push(`name:${name}`);
    if (gender) filters.push(`gender:${gender}`);
    const filterQuery = filters.length ? `&filter=${filters.join(",")}` : "";

    const url = `${BASE_URL}/characters/?api_key=${API_KEY}&format=json&field_list=${fieldList}&limit=${limit}&offset=${offset}&sort=${sort}${filterQuery}`;

    const response = await fetch(url, {
      headers: { "User-Agent": "ComicApp" }, // required by ComicVine
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`ComicVine API returned ${response.status}: ${text}`);
    }

    const data = await response.json();

    // Ensure results is an array
    const results = Array.isArray(data.results) ? data.results : [];

    res.json({ results });
  } catch (err) {
    console.error("Error fetching characters:", err.message, err.stack);
    res.status(500).json({ error: "Failed to fetch characters", details: err.message });
  }
});



app.listen(5000, () => console.log(" Proxy running on http://localhost:5000"));



















