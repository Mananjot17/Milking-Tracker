"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { MilkingSession } from "../types";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<MilkingSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastSessionRef = useRef<HTMLTableRowElement | null>(null);

  const loadSessions = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await axios.get<{
        sessions: MilkingSession[];
        pages: number;
      }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/milking-sessions?page=${pageNum}&limit=5`
      );
      setSessions((prev) => {
        const newSessions = res.data.sessions.filter(
          (s) => !prev.some((p) => p._id === s._id)
        );
        return [...prev, ...newSessions];
      });
      setHasMore(pageNum < res.data.pages);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch sessions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions(page);
  }, [page]);

  useEffect(() => {
    if (loading) return;
    if (!lastSessionRef.current) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    const obs = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    obs.observe(lastSessionRef.current);

    return () => obs.disconnect();
  }, [loading, hasMore]);

  const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateStr));

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const processedSessions = useMemo(
    () =>
      sessions.map((s) => ({
        ...s,
        formattedStart: formatDate(s.start_time),
        formattedEnd: formatDate(s.end_time),
        formattedDuration: formatDuration(s.duration),
      })),
    [sessions]
  );

  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-light-green">
      <h1 className="text-2xl font-bold mb-6 text-center text-dark-green">
        Milking Sessions
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-dark-green text-white">
            <tr>
              <th className="px-2 py-2 text-left">Start Time</th>
              <th className="px-2 py-2 text-left">End Time</th>
              <th className="px-2 py-2 text-left">Duration</th>
              <th className="px-2 py-2 text-left">Milk (liters)</th>
            </tr>
          </thead>
          <tbody>
            {processedSessions.length === 0 && !loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-600">
                  No sessions found
                </td>
              </tr>
            ) : (
              processedSessions.map((session, idx) => {
                const isLast = idx === processedSessions.length - 1;
                return (
                  <tr
                    key={session._id}
                    ref={isLast ? lastSessionRef : null}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="px-2 py-2">{session.formattedStart}</td>
                    <td className="px-2 py-2">{session.formattedEnd}</td>
                    <td className="px-2 py-2">{session.formattedDuration}</td>
                    <td className="px-2 py-2">{session.milk_quantity}</td>
                  </tr>
                );
              })
            )}
            {loading && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Loading more...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
