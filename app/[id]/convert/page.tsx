"use client";
import { useState } from "react";

export default function page() {
  const [videoUrl, setVideoUrl] = useState("");
  const [query, setQuery] = useState("");
  const handleSearch = async () => {
    try {;
      const url = `/api/youtube?q=${encodeURIComponent(query)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVideoUrl(data.url);
    } catch (error) {
      console.error("Failed to fetch:", error);
      // Handle the error accordingly in your UI
    }
  };

  return (
    <div className="mt-44 bg-slate-200 flex flex-col items-center gap-3 p-10">
      {/* Input field for the user to enter their search query */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="such"
        className="input-class" // Add classes for styling
      />

      {/* Button to initiate the search */}
      <button className="border-2 border-indigo-600" onClick={handleSearch}>Search YouTube</button>

      {/* Display the video URL or a message */}
      <div>{videoUrl || "Enter a search query and click search"}</div>
    </div>
  );
}
