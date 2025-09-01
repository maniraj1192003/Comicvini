// import axios from "axios";

// const API_KEY = "d0b4f08d2fc408bfd8c1130a517fde63d50ee95f";
// const BASE_URL = "https://comicvine.gamespot.com/api";
// const PROXY = "http://localhost:8080/"; // 👈 your local CORS proxy

// // Default export function
// export default async function fetchData(endpoint) {
//   try {
//     const response = await axios.get(`${PROXY}${BASE_URL}/${endpoint}/`, {
//       params: {
//         api_key: API_KEY,
//         format: "json",
//         limit: 1, // fetch just 1 item for preview card
//         field_list: "id,name,deck,image",
//       },
//     });

//     return response.data.results[0]; // return the first result
//   } catch (error) {
//     console.error(`Error fetching ${endpoint}:`, error);
//     return null;
//   }
// }
