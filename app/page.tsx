"use client";
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [topic, setTopic] = useState("");
  const [expertise, setExpertise] = useState("Intermediate");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, topic, expertise }),
    });
    const data = await res.json();
    setOutput(data.result || data.error || "No output.");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
          💬 AI Quora Answer Generator
        </h1>
        <p className="text-gray-400 mb-8">Generate upvote-worthy Quora answers with credibility hooks, structured reasoning, and optimal formatting for maximum visibility.</p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Quora Question</label>
              <input value={question} onChange={e => setQuestion(e.target.value)} required placeholder="e.g. What are the best AI tools for content creators?" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Topic / Category</label>
              <input value={topic} onChange={e => setTopic(e.target.value)} required placeholder="e.g. Artificial Intelligence, Productivity, Marketing" className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">Your Expertise Level</label>
              <select value={expertise} onChange={e => setExpertise(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
                <option>Industry Professional</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 bg-gradient-to-r from-amber-500 to-amber-700 hover:opacity-90 disabled:opacity-50 shadow-lg shadow-amber-500/20">
            {loading ? "Generating Answer…" : "✨ Generate Quora Answer"}
          </button>
        </form>

        {output && (
          <div className="bg-gray-900/60 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3 text-gray-200">Generated Quora Answer</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap">{output}</div>
          </div>
        )}
      </div>
    </main>
  );
}
