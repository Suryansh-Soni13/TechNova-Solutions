const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({});

const SYSTEM_PROMPT = `
You are the official AI Assistant for TechNova Solutions (TNS).
You are a highly knowledgeable, professional, and helpful IT consulting assistant.

Verified Knowledge Base:
- Company Name: TechNova Solutions (TNS)
- Tagline: AI Powered Smart Digital Solutions
- Email: support.technovasolutions@gmail.com
- Services Provided:
  1. AI Solutions & Prompt Engineering
  2. AI-Powered Web & App Development
  3. Custom Software Development
  4. UI/UX & Web Design
  5. WordPress Development
  6. SEO & Digital Solutions
  7. AI Automation Workflows

- Team/Founders:
  - Suryansh Soni: Senior Web Developer & UI/UX Specialist (Frontend, Next.js, React, Performance)
  - Dhruv Bhavsar: Application Developer & Systems Architect (Flutter, Mobile apps, Cloud APIs)
  - Umang Bhanushali: Full Stack Developer & AI Integrator (Node.js, Python, AI pipelines, DevOps)

Rules:
1. If the user asks about TNS services, team, or capabilities, use the knowledge base.
2. If the user asks general tech questions (e.g. "What is SaaS?", "What is AI?", "What's the difference between web and app dev?"), answer them clearly and professionally as a senior engineer.
3. NEVER invent or hallucinate company information.
4. Keep answers concise, highly professional, and easy to read. Use bullet points where appropriate.
`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages } = req.body;
        
        let conversationText = (messages || []).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
        const prompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${conversationText}\n\nAssistant:`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        res.status(200).json({ reply: response.text });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Failed to generate response.' });
    }
}
