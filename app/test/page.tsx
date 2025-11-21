"use client";

import { useState } from "react";

export default function TestAPI() {
  const [response, setResponse] = useState<string>("");

  const testGET = async () => {
    const res = await fetch("/api/contribution");
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  };

  const testPOST = async () => {
    const res = await fetch("/api/contribution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contributionType: "percent",
        contributionValue: 10,
      }),
    });
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">API Test Page</h1>
      
      <div className="space-x-4 mb-6">
        <button
          onClick={testGET}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test GET
        </button>
        
        <button
          onClick={testPOST}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test POST
        </button>
      </div>

      <div className="bg-white p-4 rounded border">
        <h2 className="font-bold mb-2">Response:</h2>
        <pre className="text-sm">{response || "Click a button to test"}</pre>
      </div>
    </div>
  );
}