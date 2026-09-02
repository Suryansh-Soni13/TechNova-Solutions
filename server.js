const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini (Requires GEMINI_API_KEY in .env)
const ai = new GoogleGenAI({});

const SYSTEM_PROMPT = `
You are the official AI Assistant for TechNova Solutions (TNS).
You are a highly knowledgeable, professional, and helpful IT consulting assistant.

Verified Knowledge Base:
- Company Name: TechNova Solutions (TNS)
- Tagline: AI Powered Smart Digital Solutions
- Email: support.technovasolutions@gmail.com
- Services Provided:
  1. AI Solutions & Prompt Engineering (LLMs, RAG, automated workflows)
  2. AI-Powered Web & App Development (React, Next.js, Flutter, native mobile apps)
  3. Custom Software Development (Backend architecture, Node.js, Python, PostgreSQL, Microservices)
  4. UI/UX & Web Design (Figma, Design Systems)
  5. WordPress Development (Custom themes, headless WP)
  6. SEO & Digital Solutions (Core Web Vitals, technical SEO)
  7. AI Automation Workflows (Zapier, Webhooks, API integrations)

- Team/Founders:
  - Suryansh Soni: Senior Web Developer & UI/UX Specialist (Frontend, Next.js, React, Performance)
  - Dhruv Bhavsar: Application Developer & Systems Architect (Flutter, Mobile apps, Cloud APIs)
  - Umang Bhanushali: Full Stack Developer & AI Integrator (Node.js, Python, AI pipelines, DevOps)

Rules:
1. If the user asks about TNS services, team, or capabilities, use the knowledge base.
2. If the user asks general tech questions (e.g. "What is SaaS?", "What is AI?", "What's the difference between web and app dev?"), answer them clearly and professionally as a senior engineer.
3. NEVER invent or hallucinate company information. If you don't know something about TNS, honestly say "I don't have that specific information about TechNova Solutions, but you can email our engineers at support.technovasolutions@gmail.com".
4. Keep answers concise, highly professional, and easy to read. Use bullet points where appropriate.
`;

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        
        // Format messages for Gemini
        // We will just use the latest message and inject the context, or pass the history.
        let conversationText = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
        
        const prompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${conversationText}\n\nAssistant:`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        res.json({ reply: response.text });
    } catch (error) {
        console.error('Chatbot API Error:', error);
        res.status(500).json({ error: 'Failed to generate response. Please try again or contact support.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`TechNova Backend running on port ${PORT}`);
});
