"use client";

import { useState } from "react";
import Link from "next/link";

export default function WebVersionPage() {
  const [apiKey, setApiKey] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const handleGeolocate = async () => {
    if (!apiKey || !csvFile) {
      alert("Please enter a valid API Key and select a CSV file.");
      return;
    }

    setProcessing(true);

    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("apiKey", apiKey);

    try {
      const response = await fetch("/api/geolocate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error processing CSV!");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while processing.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      {/* Title */}
      <Link href="/">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-6 tracking-tight cursor-pointer hover:text-blue-600 transition">
          GeoLocater<span className="text-blue-600">.io</span>
        </h1>
      </Link>

      {/* Subtext */}
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-12">
        Affordable geocoding for businesses of all sizes.
        <br />
        Upload your addresses, get accurate coordinates — no expensive software
        needed.
      </p>

      {/* Upload Form */}
      <div className="flex flex-col gap-6 w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* API Key Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="apiKey" className="font-semibold text-gray-700">
            Google Maps API Key
          </label>
          <input
            id="apiKey"
            type="text"
            placeholder="Enter your API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="border p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* File Upload Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="file" className="font-semibold text-gray-700">
            Upload CSV File
          </label>

          <input
            id="file"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="file"
            className="cursor-pointer bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition font-semibold text-center"
          >
            {csvFile ? "File Selected ✅" : "Choose CSV File"}
          </label>

          {csvFile && (
            <p className="text-sm text-gray-500 mt-2 truncate">
              {csvFile.name}
            </p>
          )}
        </div>

        {/* Geolocate Button */}
        <button
          onClick={handleGeolocate}
          disabled={!csvFile || !apiKey || processing}
          className={`p-5 rounded-xl font-bold text-lg transition-all ${
            !csvFile || !apiKey
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {processing ? "Processing..." : "Geolocate Addresses"}
        </button>

        {/* Download Link */}
        {downloadUrl && (
          <a
            href={downloadUrl}
            download="processed.csv"
            className="text-blue-600 underline text-center mt-4 font-semibold"
          >
            Download Processed CSV
          </a>
        )}
      </div>
      <footer className="w-full mt-20 p-4 border-t text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GeoLocater.io — Built by Riwaz Poudel
      </footer>
    </main>
  );
}
