import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Gemini } from './services/gemini';


dotenv.config();

const app = express();
const gemini = new Gemini ();

app.use(cors());
app.use(express.json());

const host = process.env.HOST ?? 'localhost';
const port = Number(process.env.PORT) || 3000;

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: 'Prompt is required',
      });
    }

    const response = await gemini.generateResponse(prompt);

    return res.json({
      response,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});