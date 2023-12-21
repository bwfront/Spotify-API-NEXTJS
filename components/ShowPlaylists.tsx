export default function ShowPlaylists(props: any) {
  console.log("Show Playlist", props);
  return (
    <div className="mt-24 w-full flex items-center flex-col">
      <div className="text-3xl font-bold uppercase">Select Playlist</div>
      <div className="flex w-full justify-evenly gap-3">
        {props.playlists.items.map((playlist: any) => {
          console.log(playlist);
          return (
            <div key={playlist.id} className="flex items-center flex-col mt-10">
              <img
                className="h-44 w-44 object-cover"
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
