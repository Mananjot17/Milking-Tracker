"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";

interface Session {
  id: string; // UUID from backend
  start_time: string;
  end_time: string;
  duration: number; // seconds
  milk_quantity: number;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch sessions from API
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get<Session[]>(
          "http://localhost:5000/api/milking-sessions"
        );
        setSessions(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch sessions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Helper: format date
  const formatDate = (dateStr: string) =>
    new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateStr));

  // Helper: format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Memoized sessions with formatted values
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

  if (loading) return <p className="text-center mt-10">Loading sessions...</p>;
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
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">End Time</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Milk (liters)</th>
            </tr>
          </thead>
          <tbody>
            {processedSessions.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-600">
                  No sessions found
                </td>
              </tr>
            ) : (
              processedSessions.map((session) => (
                <tr key={session.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">{session.formattedStart}</td>
                  <td className="px-4 py-2">{session.formattedEnd}</td>
                  <td className="px-4 py-2">{session.formattedDuration}</td>
                  <td className="px-4 py-2">{session.milk_quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
