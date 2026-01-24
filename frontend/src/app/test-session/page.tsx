"use client";
import { useSession } from "next-auth/react";

export default function TestSession() {
  const { data: session } = useSession();
  return (
    <div className="p-10 bg-black text-green-500 font-mono">
      <h1 className="text-2xl mb-5">--- SESSION DEBUGGER ---</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}