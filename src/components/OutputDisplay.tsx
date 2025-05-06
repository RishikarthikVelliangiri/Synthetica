"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";

interface OutputDisplayProps {
  data: string;
  isLoading: boolean;
  error: string | null;
  format?: string;
}

const OutputDisplay = ({
  data = "",
  isLoading = false,
  error = null,
  format = "json",
}: OutputDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadData = () => {
    // Detect the actual format from the data content
    const actualFormat = detectFormat(data);
    const blob = new Blob([data], { type: getContentType(actualFormat) });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `synthetic-data.${actualFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Detect the format from the data content if not explicitly provided
  const detectFormat = (data: string): string => {
    if (!data) return format;

    const lowerData = data.trim().toLowerCase();
    if (lowerData.startsWith("{") || lowerData.startsWith("[")) return "json";
    if (lowerData.includes("create table") || lowerData.includes("insert into"))
      return "sql";
    if (
      lowerData.startsWith("<?xml") ||
      (lowerData.startsWith("<") &&
        lowerData.includes("</") &&
        lowerData.includes(">"))
    )
      return "xml";
    if (lowerData.includes(",") && lowerData.split("\n")[0].includes(","))
      return "csv";
    if (
      lowerData.includes(":") &&
      lowerData.includes("-") &&
      !lowerData.includes("{")
    )
      return "yaml";

    return format;
  };

  const getContentType = (format: string) => {
    switch (format.toLowerCase()) {
      case "json":
        return "application/json";
      case "csv":
        return "text/csv";
      case "sql":
        return "application/sql";
      case "xml":
        return "application/xml";
      case "yaml":
        return "application/yaml";
      default:
        return "text/plain";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium text-blue-700">Generated Data</h2>
        <div className="flex gap-2">
          {data && (
            <>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-blue-200 hover:bg-blue-50"
                disabled={isLoading || !data}
              >
                {copied ? (
                  <>
                    <CheckIcon className="h-4 w-4 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
              <Button
                onClick={downloadData}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-blue-200 hover:bg-blue-50"
                disabled={isLoading || !data}
              >
                <DownloadIcon className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </>
          )}
        </div>
      </div>

      <Card className="w-full border border-blue-100 shadow-md">
        <CardContent className="p-4">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-blue-100" />
              <Skeleton className="h-4 w-3/4 bg-blue-100" />
              <Skeleton className="h-4 w-5/6 bg-blue-100" />
              <Skeleton className="h-4 w-2/3 bg-blue-100" />
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 bg-red-50 rounded-md">{error}</div>
          ) : data ? (
            <pre className="whitespace-pre-wrap break-words text-sm font-mono bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-md overflow-auto max-h-[400px] border border-blue-100">
              {data}
            </pre>
          ) : (
            <div className="text-blue-400 text-center py-12 bg-blue-50 rounded-md">
              Generated data will appear here
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OutputDisplay;
