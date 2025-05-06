"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface InputFormProps {
  onSubmit: (prompt: string, format: string) => void;
  isLoading?: boolean;
}

export default function InputForm({
  onSubmit = () => {},
  isLoading = false,
}: InputFormProps) {
  const [prompt, setPrompt] = useState("");
  const [format, setFormat] = useState("json");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt, format);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md border border-blue-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-lg font-medium text-blue-700">
            Describe the synthetic data you need
          </label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the synthetic data you need... e.g., '5 sample JSON objects for user profiles with name, email, and city'"
            className="min-h-[150px] resize-y border-blue-200 focus:border-blue-400"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-md font-medium text-blue-700">
            Select Output Format
          </h3>
          <RadioGroup
            value={format}
            onValueChange={setFormat}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="json" id="json" />
              <Label htmlFor="json" className="cursor-pointer">
                JSON
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="csv" id="csv" />
              <Label htmlFor="csv" className="cursor-pointer">
                CSV
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sql" id="sql" />
              <Label htmlFor="sql" className="cursor-pointer">
                SQL
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="xml" id="xml" />
              <Label htmlFor="xml" className="cursor-pointer">
                XML
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yaml" id="yaml" />
              <Label htmlFor="yaml" className="cursor-pointer">
                YAML
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-sm"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? "Generating..." : "Generate Data"}
        </Button>
      </form>
    </div>
  );
}
