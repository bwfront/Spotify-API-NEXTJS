"use client";
import { useToken } from "../contexts/TokenContext";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
export default function NavBar() {
  const tokenExpiredStatus = useToken();
  const { data: session, status } = useSession();
  if (!tokenExpiredStatus) {
  }

  return (
    <div className="w-full h-16 top-0 bg-slate-800 shadow-2xl flex px-12 items-center justify-between absolute">
      <div className="text-2xl text-fuchsia-200 font-bold">Template</div>

      {status === "authenticated" && !tokenExpiredStatus && session.user && (
        <div className="text-white text-xl font-semibold">
          Welcome, {session?.user?.name}
        </div>
      )}

      {status === "unauthenticated" ||
        (tokenExpiredStatus && (
          <button
            onClick={() => signIn("spotify", { callbackUrl: "/" })}
            className="bg-slate-600 rounded-md px-4 py-2 text-white hover:bg-slate-500 transition-all"
          >
            Login
          </button>
        ))}
    </div>
  );
}
