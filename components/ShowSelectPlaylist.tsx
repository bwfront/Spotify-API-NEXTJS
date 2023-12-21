"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  id: string
}

export default function ShowSelectPlaylist(props: Props) {
  const { data: session, status } = useSession();
  const [playlist, setPlaylist] = useState<any>(null);


  useEffect(() => {
    fetchPlaylist(props.id).then((data) => {
      setPlaylist(data);
    });
  });

  async function fetchPlaylist(id: string): Promise<any> {
    if (session?.accessToken) {
      const result = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
      return await result.json();
    }
  }

  if (playlist) {
    return (
      <>
        <div className="mt-12 bg-gray-200 rounded px-20 py-4 w-full">
          <div className="mb-4">Selected Playlist:</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                className="h-24 w-24 object-cover rounded-full"
                src={playlist.images[0].url}
                alt="playlist cover"
              />
              <a
                className="text-2xl hover:underline cursor-pointer"
                target="_blank"
                href={`https://open.spotify.com/playlist/${playlist.id}`}
              >
                {playlist.name}
              </a>
            </div>
            <Link href={`/${playlist.id}/convert`}
            >
              <div className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Convert
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-2 bg-gray-200 rounded px-20 py-4 w-full">
          <div className="h-96 overflow-y-scroll">
            <div className="flex flex-col gap-3 px-3">
              {playlist.tracks.items.map((track: any) => {
                return (
                  <div key={track.track.id} className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-16 w-16 object-cover"
                        src={track.track.album.images[0].url}
                        alt="playlist cover"
                      />
                      <div>
                        <div>{track.track.name}</div>
                        <div>{track.track.artists[0].name}</div>
                      </div>
                    </div>
                    <div>{track.track.duration_ms}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
