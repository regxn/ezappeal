import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  const body = await req.json()

  const prompt = `
Write a professional Roblox appeal.

Username: ${body.username}
Reason: ${body.reason}
Explanation: ${body.explanation}

Make it polite and professional.
`

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  return Response.json({
    appeal: response.choices[0].message.content,
  })
}