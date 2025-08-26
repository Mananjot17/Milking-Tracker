"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: "var(--light-green)" }}
    >
      <h1
        className="text-3xl font-bold mb-8"
        style={{ color: "var(--dark-green)" }}
      >
        🐄 Milking Tracker
      </h1>

      <button
        className="btn-green mb-4 cursor-pointer"
        onClick={() => router.push("/milking")}
      >
        Start Milking
      </button>

      <Link
        href="/history"
        style={{ color: "var(--dark-green)" }}
        className="underline"
      >
        View Milking History
      </Link>
    </div>
  );
}
