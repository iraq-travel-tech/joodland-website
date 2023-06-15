import type { NextApiRequest, NextApiResponse } from "next";
import { Airports } from "./airports";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if the request method is GET
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" }); // Method Not Allowed
    }

    // Check if the query exists and is a string, and limit its size to prevent abuse
    const query =
      typeof req.query.q === "string"
        ? req.query.q.toLowerCase().slice(0, 100)
        : "";

    // Check if a limit parameter is provided
    const limit =
      typeof req.query.limit === "string" ? parseInt(req.query.limit, 10) : 5;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Filter airports that contain the query in their name, city, country, or IATA code.
    const results = Airports.filter((airport) => {
      const searchableFields = [
        airport.name,
        airport.city,
        airport.country,
        airport.iata,
      ].map((field) => field.toLowerCase());
      return searchableFields.some((field) => field.includes(query));
    }).slice(0, limit); // Take up to "limit" results

    return res.status(200).json(results);
  } catch (error) {
    // Handle unexpected errors
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
