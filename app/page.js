'use client'

import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    const form = new FormData(e.target)

    const data = {
      username: form.get('username'),
      email: form.get('email'),
      reason: form.get('reason'),
      explanation: form.get('explanation'),
    }

    const res = await fetch('/api/appeal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    setResult(json.appeal)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-6xl font-black mb-6">
          EZAPPEAL
        </h1>

        <p className="text-white/60 mb-12 text-lg">
          Generate professional Roblox moderation appeals with AI.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="username"
            placeholder="Roblox Username"
            className="w-full bg-zinc-900 border border-white/10 p-4 rounded-2xl"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-900 border border-white/10 p-4 rounded-2xl"
            required
          />

          <input
            name="reason"
            placeholder="Ban Reason"
            className="w-full bg-zinc-900 border border-white/10 p-4 rounded-2xl"
            required
          />

          <textarea
            name="explanation"
            placeholder="Explain what happened"
            className="w-full bg-zinc-900 border border-white/10 p-4 rounded-2xl h-40"
            required
          />

          <button
            type="submit"
            className="bg-white text-black px-8 py-4 rounded-full font-bold"
          >
            {loading ? 'Generating...' : 'Generate Appeal'}
          </button>
        </form>

        {result && (
          <div className="mt-16 bg-zinc-900 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6">
              Generated Appeal
            </h2>

            <p className="whitespace-pre-wrap text-white/80 leading-relaxed">
              {result}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}