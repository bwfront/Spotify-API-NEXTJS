"use client";
import LoadingScreen from "@/components/LoadingScreen";
import ShowPlaylists from "@/components/ShowAllPlaylists";
import Unauthenticated from "@/components/Unauthendticated";
import { SpotifyData } from "@/interfaces/SpotifyData";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useToken } from '../contexts/TokenContext';
export default function Page() {
  const { data: session, status } = useSession();
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const { isTokenExpired, setIsTokenExpired } = useToken();

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/spotify")
        .then((res) => {
          if (res.status === 401) {
            setIsTokenExpired(true);
            return null;
          }
          return res.json();
        })
        .then((data) => {
          setSpotifyData(data);
        })
        .catch((err) => console.log(err));
    }
  }, [status]);

  if (status === "loading") {
    return <LoadingScreen text="Loading authenticated status..." />;
  }

  if (status === "unauthenticated" || isTokenExpired) {
    return <Unauthenticated />;
  }

  if (!spotifyData) {
    return <LoadingScreen text="Loading Spotify information..." />;
  }

  if (spotifyData.data.allPlaylists.length != 0) {
    return (
      <div className="mt-14">
        <ShowPlaylists playlists={spotifyData.data.allPlaylists} />
      </div>
    );
  }
}
