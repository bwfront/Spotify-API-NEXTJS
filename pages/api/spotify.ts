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

  //console.log("AccesToke.", accessToken); Log the access token

  // Use the access token to make a Spotify API request
  // ...

  // Once done, send back the response
  res.status(200).json({ message: "Success", data: accessToken });
}
