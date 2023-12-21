const { google } = require("googleapis");
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  });

  const query = req.query.q;
  console.log("Server received query:", query);

  try {
    const response = await youtube.search.list({
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 1,
    });

    console.log("YouTube API response:", response);
    const videos = response.data.items;
    if (videos.length > 0) {
      const videoUrl = `https://www.youtube.com/watch?v=${videos[0].id.videoId}`;
      res.status(200).json({ url: videoUrl }); // Send the URL back to the client
    } else {
      res.status(404).json({ message: "No results found" });
    }
  } catch (error) {
    console.error("Error during YouTube search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
