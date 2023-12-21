import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type SelectPlaylistProps = {
  id: string | null;
};

export default function ShowSelectPlaylist(props: SelectPlaylistProps) {
  const { data: session, status } = useSession();
  const [playlist, setPlaylist] = useState<any>(null);
  const id = props.id;

  useEffect(() => {
    if (id) {
      fetchPlaylist(id).then((data) => {
        setPlaylist(data);
      });
    }
  }, [id]);

  useEffect(() => {
    console.log(playlist);
  }, [playlist]);

  if (props.id === null) {
    return <div></div>;
  }

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
        <div className="mt-12 bg-gray-200 rounded p-4 w-full">
          <div>
            <img
              className="h-24 w-24 object-cover"
              src={playlist.images[0].url}
              alt=""
            />
            <div>{playlist.name}</div>
          </div>
        </div>
        <div className="mt-2 h-96 overflow-y-scroll bg-gray-200 rounded p-4 w-full">
          <div>
            <div className="flex flex-col gap-3">
              {playlist.tracks.items.map((track: any) => {
                return (
                  <div key={track.track.id} className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-16 w-16 object-cover"
                        src={track.track.album.images[0].url}
                        alt=""
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
