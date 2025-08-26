"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Suspense } from "react";

const MilkingTimer = dynamic(() => import("../components/MilkingTimer"), {
  ssr: false,
});

export default function Home() {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-light-green">
      {!showTimer ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-dark-green">
            🐄 Milking Tracker
          </h1>
          <button
            className="btn-green cursor-pointer text-white rounded-lg mb-4"
            onClick={() => setShowTimer(true)}
          >
            Start Milking
          </button>
        </>
      ) : (
        <Suspense fallback={<p>Loading Timer...</p>}>
          <MilkingTimer />
        </Suspense>
      )}

      <Link href="/history" className="underline mt-6 text-dark-green">
        View Milking History
      </Link>
    </div>
  );
}
