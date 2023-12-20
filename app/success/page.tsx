"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  console.log(session, status); // session log

  const resData = fetchSpotify();

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") return <div>Unauthenticated</div>;

  return <div>Logged In</div>;
}

function fetchSpotify() {
  useEffect(() => {
    fetch("/api/spotify")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        //Can set the data here or pass it to the next then block
        return data;
      })
      .catch((error) => {
        //Can log the error here or pass it to the next catch
        return error;
      });
  }, []);
}
