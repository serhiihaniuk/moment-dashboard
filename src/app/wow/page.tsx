"use client";
import { useState, useEffect } from "react";
import JSConfetti from "js-confetti";

export default function Home() {
  const [jsConfetti, setJsConfetti] = useState<any>(null);

  useEffect(() => {
    // Initialize JSConfetti only on the client-side
    setJsConfetti(new JSConfetti());
  }, []);

  const handleClick = () => {
    if (jsConfetti) {
      jsConfetti.addConfetti({
        emojis: ["🎉", "🎊", "🥳", "✨"],
        emojiSize: 30,
        confettiNumber: 20,
      });

      jsConfetti.addConfetti({
        confettiColors: [
          "#ff0a54",
          "#ff477e",
          "#ff7096",
          "#ff85a1",
          "#fbb1bd",
          "#f9bec7",
        ],
      });

      jsConfetti.addConfetti({
        emojis: ["🦄"],
        emojiSize: 50,
        confettiNumber: 3,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleClick}
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
      >
        Тиць 🎉
      </button>
    </div>
  );
}
