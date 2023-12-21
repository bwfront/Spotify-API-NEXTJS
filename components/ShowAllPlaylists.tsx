import { useState } from "react";
import ShowSelectPlaylist from "./ShowSelectPlaylist";
import { useRouter } from 'next/navigation';

export default function ShowPlaylists(props: any) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  const router = useRouter(); // Initialize the useRouter hook

  function handleClick(id: string) {
    if(id === selectedPlaylist) {
      setSelectedPlaylist(null);
      return;
    }else{
      router.push(`/${id}`);
      setSelectedPlaylist(id);
    }
  }

  return (
    <div className="mt-24 w-full flex items-center flex-col">
      <div className="text-3xl font-bold uppercase">Select Playlist</div>
      <div className="flex w-full justify-evenly gap-3">
        {props.playlists.items.map((playlist: any) => {

          //console.log(playlist);

          return (
            <div
              key={playlist.id}
              className="flex items-center flex-col mt-10 cursor-pointer"
              onClick={() => handleClick(playlist.id)}
            >
              <img
                className="h-44 w-44 object-cover rounded-full"
                src={playlist.images[0].url}
                alt="playlist image"
              />
              <div>{playlist.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
