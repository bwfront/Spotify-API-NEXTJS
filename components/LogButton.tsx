import { signIn, signOut } from "next-auth/react";

type LogButtonProps = {
  function: "login" | "logout";
};

export default function LogButton(props: LogButtonProps) {
  if (props.function == "login") {
    return (
      <button
        onClick={() => signIn("spotify", { callbackUrl: "/" })}
        className="bg-slate-600 rounded-md px-4 py-2 text-white hover:bg-slate-500 transition-all"
      >
        Login
      </button>
    );
  }
  if (props.function == "logout") {
    return (
      <button
        onClick={() => signOut()}
        className="bg-slate-600 rounded-md px-4 py-2 text-white hover:bg-slate-500 transition-all"
      >
        Logout
      </button>
    );
  }
  
  return null;
}
