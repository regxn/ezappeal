import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(req) {
  const body = await req.json()

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
  })

  const prompt = `
Write a professional Roblox moderation appeal.

Username: ${body.username}
Reason: ${body.reason}
Explanation: ${body.explanation}

Make it polite and professional.
`

  const result = await model.generateContent(prompt)

  const response = await result.response
  const text = response.text()

  return Response.json({
    appeal: text,
  })
}