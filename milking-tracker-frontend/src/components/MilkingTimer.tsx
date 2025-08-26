"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function MilkingSession() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [milkQuantity, setMilkQuantity] = useState("");
  const [error, setError] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      audioRef.current?.pause();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const resetSession = () => {
    setSeconds(0);
    setMilkQuantity("");
    setIsRunning(false);
    setError("");
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleStop = async () => {
    setIsRunning(false);

    const duration = seconds;
    const milk = parseFloat(milkQuantity);

    if (isNaN(milk) || milk < 0) {
      setError("Enter a valid milk quantity");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/milking-sessions", {
        start_time: new Date(Date.now() - duration * 1000).toISOString(),
        end_time: new Date().toISOString(),
        duration,
        milk_quantity: milk,
      });
      resetSession();
      alert("Session saved!");
    } catch (err: any) {
      setError(err.response?.data?.error || "Error saving session");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <audio ref={audioRef} src="/music/Moon-Waltz.mp3" loop />

      <h1 className="text-2xl font-bold mb-4 text-dark-green">
        Milking Session
      </h1>

      <p className="text-4xl font-mono mb-4 text-dark-gray">
        {Math.floor(seconds / 60)}:{("0" + (seconds % 60)).slice(-2)}
      </p>

      <div className="flex gap-4 mb-4">
        <button className="btn-green" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          className="btn-red"
          onClick={handleStop}
          disabled={seconds === 0}
        >
          Stop
        </button>
      </div>

      <input
        type="number"
        placeholder="Milk Quantity (lit)"
        className="input"
        value={milkQuantity}
        onChange={(e) => setMilkQuantity(e.target.value)}
      />

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
