import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI SDK server-side
  const getGeminiAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Route: AI Cheapo Concierge Chatbot
  app.post('/api/concierge', async (req, res) => {
    try {
      const { prompt, userWeight, userBudget, origin, destination } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ error: 'Prompt is required.' });
        return;
      }

      const ai = getGeminiAI();

      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not configured yet
        res.json({
          reply: `[Cheapo AI Bot]: Welcome to Cheapo Air! To save costs, I recommend: 1) Wear 8 jackets onto the plane, 2) BYO plastic bag as carry-on, 3) Inhale deeply before boarding so you don't need oxygen add-ons! (Route: ${origin || 'SIN'} to ${destination || 'KUL'})`
        });
        return;
      }

      const systemInstruction = `
You are "Auntie KiamSiap", the lead AI Travel Concierge for Cheapo Air - the world's most stingy, hilarious ultra-budget airline inspired by Singapore Airlines.
Your personality:
- Extremely money-conscious, witty, humorous, helpful, uses light Singaporean/Asian budget travel humor (Singlish terms like 'lobang', 'kiam siap', 'cheapo', 'save dollar', 'lah', 'hor' welcomed).
- Always give absurdly stingy, hilarious, yet practical advice on how travelers can save money flying on Cheapo Air.
- Advice topics: How many layers of clothes to wear to avoid baggage fees, how to claim free tap water, standing class posture tips, how to maximize peanut rations, how to pack in cargo pockets, how to sneak a plastic bag on board as baggage.
- Keep responses concise (around 2 to 3 short paragraphs max), entertaining, and directly address the user's flight query!
`;

      const userContext = `User query: "${prompt}". User Budget: $${userBudget || 50}. User weight context: ${userWeight || 65}kg. Route: ${origin || 'Singapore'} to ${destination || 'Kuala Lumpur'}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: userContext,
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      const replyText = response.text || "Cheapo AI is resting to save electricity! Please try asking again.";

      res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Error in /api/concierge:', err);
      res.status(500).json({
        error: 'Cheapo AI server error.',
        reply: "Wah, server high traffic! Quick tip: Always wear your heaviest winter coat onto the plane even in 35°C weather to save $45 luggage fee!"
      });
    }
  });

  // API Route: Flight Search Mock endpoint
  app.get('/api/flights', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development vs static production server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cheapo Air server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
