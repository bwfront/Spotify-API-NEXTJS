"use client";
import { useToken } from "../contexts/TokenContext";
import { useSession } from "next-auth/react";
import LogButton from "./LogButton";
export default function NavBar() {
  const tokenExpiredStatus = useToken();
  const { data: session, status } = useSession();
  
  if (!tokenExpiredStatus) {
  }

  if (status === "authenticated" || !tokenExpiredStatus) {
    return (
      <div className="w-full h-16 top-0 bg-slate-800 shadow-2xl flex px-12 items-center justify-between absolute">
        <div className="text-2xl text-fuchsia-200 font-bold">Template</div>

        <div className="text-white text-xl font-semibold">
          Welcome, {session?.user?.name}
        </div>
        <LogButton function="logout" />
      </div>
    );
  }

  return (
    <div className="w-full h-16 top-0 bg-slate-800 shadow-2xl flex px-12 items-center justify-between absolute">
      <div className="text-2xl text-fuchsia-200 font-bold">Template</div>
        <LogButton function="login" />
    </div>
  );
}

