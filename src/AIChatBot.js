import axios from "axios";
const YOUR_API_KEY = import.meta.env.VITE_API_KEY

export default async function genarateResponse(prompt) {
  const response = await axios({
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${YOUR_API_KEY}`,
    method: 'post',
    data: {
      contents: [
        { parts: [{ text: prompt }] }
      ]
    }
  })
  const candit= response.data.candidates[0].content.parts[0].text
  const cleanRes = candit.replaceAll(/\*/g,' ')
  console.log(cleanRes)
  return cleanRes
}