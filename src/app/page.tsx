"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaApple, FaWindows, FaGlobe, FaYoutube } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-extrabold text-gray-800 mb-6 tracking-tight"
      >
        GeoLocater<span className="text-blue-600">.io</span>
      </motion.h1>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg text-gray-600 max-w-2xl text-center mb-12 space-y-6"
      >
        <p>
          GeoLocater.io is a simple yet powerful tool designed to help small
          businesses and agencies easily perform geocoding without the need for
          expensive software or complex setups. Many organizations struggle with
          converting addresses into usable geographic coordinates because
          traditional geocoding platforms are costly, overly technical, or
          locked behind heavy licensing fees. GeoLocater.io solves that problem.
        </p>

        <p>
          Using a straightforward web interface, users can upload a CSV file
          containing their addresses, input their own Google Maps API key, and
          instantly receive a processed file with accurate latitude and
          longitude values for each location. There&apos;s no need for
          specialized knowledge or large investments — just a Google Maps API
          key and a CSV file are enough.
        </p>

        <p>
          This tool is especially helpful for smaller teams that need to map
          client addresses, track deliveries, analyze service areas, or build
          location-based apps. Our goal is to empower businesses of all sizes to
          harness the power of location data with ease and flexibility. At
          GeoLocater.io, we believe geocoding should be simple, cost-effective,
          and available to anyone — no expensive software required.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col md:flex-row gap-6"
      >
        {/* Install for Mac */}
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          <FaApple size={24} />
          Install for Mac
        </a>

        {/* Install for Windows */}
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-xl text-lg font-semibold shadow-md hover:bg-green-700 transition-all duration-300"
        >
          <FaWindows size={24} />
          Install for Windows
        </a>

        {/* Use the Web Version */}
        <Link
          href="/web-version"
          className="flex items-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-xl text-lg font-semibold shadow-md hover:bg-purple-700 transition-all duration-300 text-center"
        >
          <FaGlobe size={24} />
          Use the Web Version
        </Link>

        {/* Tutorial */}
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-8 py-4 bg-yellow-500 text-white rounded-xl text-lg font-semibold shadow-md hover:bg-yellow-600 transition-all duration-300"
        >
          <FaYoutube size={24} />
          Tutorial
        </a>
      </motion.div>

      <footer className="w-full mt-20 p-4 border-t text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GeoLocater.io — Built by Riwaz Poudel
      </footer>
    </main>
  );
}
