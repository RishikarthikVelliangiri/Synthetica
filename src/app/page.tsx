"use client";

import { useState } from "react";
import InputForm from "../components/InputForm";
import OutputDisplay from "../components/OutputDisplay";

export default function Home() {
  const [generatedData, setGeneratedData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [format, setFormat] = useState<string>("json");

  const handleSubmit = async (prompt: string, selectedFormat: string) => {
    setFormat(selectedFormat);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, format }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate data. Please try again.");
      }

      const data = await response.json();
      setGeneratedData(data.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
      setGeneratedData("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 bg-white">
      <header className="w-full max-w-3xl mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Synthetica
        </h1>
        <p className="text-gray-600">AI Synthetic Data Generator</p>
      </header>

      <div className="w-full max-w-3xl flex flex-col gap-8">
        <InputForm onSubmit={handleSubmit} isLoading={isLoading} />

        <OutputDisplay
          data={generatedData}
          isLoading={isLoading}
          error={error}
          format={format}
        />
      </div>

      <footer className="mt-12 text-sm text-gray-500">
        Powered by AI | Free to use
      </footer>
    </main>
  );
}
