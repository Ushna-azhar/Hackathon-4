'use client';
import React, { useState, useEffect } from "react";

export default function Header() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videos = [
    "/header2.mp4", // Replace with your video URLs
    "/header3.mp4",
    "/header5.mp4",
    "/header6.mp4",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        {videos.map((video, index) => (
          <video
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentVideo ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            src={video}
            autoPlay
            loop
            muted
            preload="auto"
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Welcome to ShoeZone</h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl">
          Find your perfect pair of shoes today!
        </p>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg text-lg transition duration-200">
          Explore Now
        </button>
      </div>
    </header>
  );
}
