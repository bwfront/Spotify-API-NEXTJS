"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function Page() {
  const { data: session, status } = useSession();
  const [spotifyData, setSpotifyData] = useState("");
  //console.log(session, status); // session log
  //session - user.mail, user.name

  useEffect(() => {
    fetch("/api/spotify")
      .then((res) => res.json())
      .then((data) => setSpotifyData(data))
      .catch((err) => console.log(err));
  }, []);

  
  useEffect(() => {
    console.log("Spotify Data:", spotifyData);
  }, [spotifyData]);

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") return <div>Unauthenticated</div>;

  return (
    <div>
      <h1>Spotify Data</h1>
      <pre>{JSON.stringify(spotifyData, null, 2)}</pre>
    </div>
  );
}

