export interface SpotifyData {
  data: {
    singlePlaylist: any;
    profile: any;
    allPlaylists: any;
    accessToken: string;
  };
  message: string;
}

export interface SpotifyPlaylist {
  data: {
    singlePlaylist: any;
  };
}
