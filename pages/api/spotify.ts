import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const accessToken = session.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "Access token not found" });
  }

  try {
    const profile = await fetchProfile(accessToken);
    const playlists = await fetchAllPlaylists(accessToken);
    const playlist = await fetchPlaylist(accessToken, '4RYVqRwRs2wCf9kQmCDtw1');

    if (profile.error || playlists.error || playlist.error) {
      return res.status(401).json({ error: "The access token expired" });
    }

    const data = {
      singlePlaylist: playlist,
      profile: profile,
      allPlaylists: playlists,
      accessToken: accessToken,
    }

    res.status(200).json({ message: "Success", data: data });
  } catch (error) {
    if (error.message === 'Token expired') {
      return res.status(401).json({ error: "Access token expired" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function fetchProfile(token: string): Promise<any> {
  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

async function fetchAllPlaylists(token: string): Promise<any> {
  const result = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });
  return await result.json();
}

async function fetchPlaylist(token: string, id: string): Promise<any> {
  const result = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });
  return await result.json();
}