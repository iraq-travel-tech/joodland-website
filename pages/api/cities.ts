import type { NextApiRequest, NextApiResponse } from "next";
import cities from "./allcities.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { q } = req.query;

  if (typeof q !== "string") {
    return res
      .status(400)
      .json({ error: 'Query parameter "q" must be a string.' });
  }

  const results = cities.filter((city) => {
    const nameEn = city.name.en.toLowerCase();
    const nameAr = city.name.ar.toLowerCase();
    const query = q.toLowerCase();

    return nameEn.includes(query) || nameAr.includes(query);
  });

  return res.status(200).json(results);
}
