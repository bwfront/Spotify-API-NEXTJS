"use client";
import { signIn } from "next-auth/react";
export default function Home() {
  return (
    <div>
      <h1>Spotify API AUTH Template</h1>
      <button
        onClick={() => signIn("spotify", { callbackUrl: "/success" })}
        className="bg-slate-600 rounded-md px-4 py-2 text-white"
      >
        Login
      </button>
    </div>
  );
}
