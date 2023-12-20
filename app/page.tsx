"use client";
import LoadingScreen from "@/components/LoadingScreen";
import Unauthenticated from "@/components/Unauthendticated";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [spotifyData, setSpotifyData] = useState("");
  //console.log(session, status); // session log
  //session - user.mail, user.name

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/spotify")
        .then((res) => res.json())
        .then((data) => {
          setSpotifyData(data);
        })
        .catch((err) => console.log(err));
    }
  }, [status]);

  useEffect(() => {
    console.log("Spotify Data:", spotifyData);
  }, [spotifyData]);

  if (status === "loading") {
    return <LoadingScreen text="Loading authenticated status..." />;
  }

  if (status === "unauthenticated") {
    return <Unauthenticated />;
  }

  if (!spotifyData) {
    return <LoadingScreen text="Loading Spotify information..." />;
  }

  return <div>Fine</div>;

}
