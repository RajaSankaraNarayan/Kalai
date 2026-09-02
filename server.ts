import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// Lazy initializer for Gemini
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Visual Recognition API endpoint for Kalai Lens
app.post('/api/lens/recognize', async (req, res) => {
  try {
    const { imageBase64, mimeType: userMimeType, curatedMarkers } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'imageBase64 is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        matchedTraditionId: null,
        matchedMarkerId: null,
        confidence: 'none',
        aiDescription: 'AI analysis unavailable (Missing GEMINI_API_KEY). Please configure your key in environment variables.',
      });
    }

    // Extract actual base64 and determine mimeType
    let cleanBase64 = imageBase64;
    let detectedMime = userMimeType || 'image/jpeg';
    const match = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (match) {
      detectedMime = match[1];
      cleanBase64 = match[2];
    } else {
      cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    }

    const systemPrompt = `You are the Kalai Cultural Vision Engine — a specialized AI expert in South Asian cultural heritage, temple architecture, traditional arts, metallurgy, textiles, and living traditions.

ANALYSIS PIPELINE:

PHASE 1: HERITAGE VERIFICATION
Determine if the provided image represents a cultural heritage subject:
- Valid subjects include: temple architecture, historical monuments, rock-cut shrines, sculptures, bronze/stone icons, lost-wax castings, traditional handlooms/mats, handmade tiles, traditional bells/metalcrafts, palm-leaf crafts, folk dance ornaments/costumes, stone inscriptions, archaeological artifacts, or heritage landscapes.
- Invalid subjects include: random selfies without craft context, modern vehicles/cars, computer screens/code, screenshots, plain receipts/documents, modern electronic gadgets, unrelated food/snacks, random household clutter, plain pets without traditional festive attire, blank/unclear photos.

If INVALID:
- Set isCulturalHeritage to false.
- Set invalidPrompt to: "This image does not appear to feature a cultural artifact, traditional craft, sculpture, or heritage architecture. Please upload or capture a photo of a temple, sculpture, craft, or historical motif."
- Set matchedTraditionId to null, matchedMarkerId to null, and confidence to "none".

If VALID (isCulturalHeritage = true):
- Set invalidPrompt to null.

PHASE 2: PRIMARY DATASET MATCHING
Check if the image matches ANY of the curated traditions in this verified dataset:
${JSON.stringify(curatedMarkers || [], null, 2)}

- If MATCHED in dataset:
  Set matchedTraditionId and matchedMarkerId to their exact IDs. Set confidence to "high". Provide shortInfo and scholarly aiDescription.

- If NOT in the curated dataset (unindexed living craft, ancient temple, musical pillar, red dunes, bell casting, etc.):
  1. Set matchedTraditionId to null.
  2. Set matchedMarkerId to null.
  3. Set confidence to "high".
  4. In "visualMotifIdentified", specify the exact name of the temple, monument, sculpture, craft, or motif (e.g. "Sri Pundarikaksha Perumal Temple", "Musical Stone Columns of Nellaiappar", "Traditional Cattle Bell Straps (Mattu Salangai / Mani)", "Therikaadu Red Sand Dunes", "Thennai Visiri Hand Fan").
  5. In "regionEstimated", identify the historical and geographical location (e.g. "Thiruvellarai, Tiruchirappalli, Tamil Nadu").
  6. In "materialCharacteristics", list 2-4 key physical/architectural/craft materials.
  7. In "shortInfo", provide a concise 2-3 sentence overview explaining what it is, its historical era/dynasty, and cultural significance.
  8. In "groundedSourceEvidence", provide a recognized archaeological, epigraphical, or cultural registry reference (e.g. "Archaeological Survey of India (ASI) / Epigraphia Indica / Divya Desam Compendium / Tamil Nadu State Archaeology Department").
  9. In "aiDescription", provide a scholarly, detailed paragraph analyzing the visual elements and craftsmanship.

Response MUST be valid JSON adhering to the specified schema.`;

    const modelNames = ['gemini-3.6-flash', 'gemini-3.7-flash'];
    let response: any = null;
    let lastError: any = null;

    for (const model of modelNames) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: detectedMime,
                  data: cleanBase64,
                },
              },
              {
                text: 'Verify cultural heritage relevance, match against dataset, or provide concise cultural shortInfo and details.',
              },
            ],
          },
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                isCulturalHeritage: {
                  type: Type.BOOLEAN,
                  description: 'Whether the image is an artifact, sculpture, temple/heritage architecture, traditional craft, textile, monument, or cultural heritage subject.',
                },
                invalidPrompt: {
                  type: Type.STRING,
                  description: 'Friendly prompt to the user if the image is not a valid cultural artifact or architecture.',
                },
                matchedTraditionId: {
                  type: Type.STRING,
                  description: 'The exact ID of the matched tradition or null if not in curated dataset.',
                },
                matchedMarkerId: {
                  type: Type.STRING,
                  description: 'The ID of the specific visual marker identified or null.',
                },
                confidence: {
                  type: Type.STRING,
                  description: 'One of "high", "low", "none".',
                },
                shortInfo: {
                  type: Type.STRING,
                  description: 'Concise 2-3 sentence overview of the artifact, temple, sculpture, or craft with key historical and stylistic details.',
                },
                aiDescription: {
                  type: Type.STRING,
                  description: 'Scholarly AI-assisted visual analysis of motifs, history, and characteristics.',
                },
                visualMotifIdentified: {
                  type: Type.STRING,
                  description: 'Name of the motif, artifact, temple, sculpture, or pattern identified.',
                },
                regionEstimated: {
                  type: Type.STRING,
                  description: 'Regional origin of the motif or site.',
                },
                materialCharacteristics: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Key physical, metallurgical, botanical, or craft characteristics observed.',
                },
                groundedSourceEvidence: {
                  type: Type.STRING,
                  description: 'Authoritative archaeological, epigraphical, or cultural heritage reference source.',
                },
              },
              required: ['isCulturalHeritage', 'confidence', 'aiDescription'],
            },
          },
        });
        if (response) break;
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${model} failed, trying next...`, err?.message);
      }
    }

    if (!response) {
      throw lastError || new Error('No Gemini model succeeded');
    }

    let parsed: any = {};
    try {
      parsed = JSON.parse(response.text?.trim() || '{}');
    } catch {
      parsed = {
        isCulturalHeritage: true,
        confidence: 'high',
        aiDescription: response.text || 'Cultural analysis completed.',
      };
    }

    // Heritage validation
    const isHeritage = parsed.isCulturalHeritage !== false;

    if (!isHeritage) {
      return res.json({
        isCulturalHeritage: false,
        invalidPrompt: parsed.invalidPrompt || 'This image does not appear to feature a cultural artifact, sculpture, craft, or heritage architecture. Please capture or upload a photo of a heritage site, traditional artwork, temple sculpture, or craft.',
        matchedTraditionId: null,
        matchedMarkerId: null,
        confidence: 'none',
        aiDescription: parsed.aiDescription || 'Non-heritage image detected.',
        shortInfo: null,
      });
    }

    // Normalize nulls, strings, and validate strictly against curated dataset
    const validTraditionIds = Array.isArray(curatedMarkers) && curatedMarkers.length > 0
      ? curatedMarkers.map((m: any) => m.traditionId)
      : ['pattamadai-mats', 'aathangudi-tiles', 'swamimalai-bronze'];

    const rawTradId = typeof parsed.matchedTraditionId === 'string' ? parsed.matchedTraditionId.trim() : null;
    const isRealMatch = rawTradId && validTraditionIds.includes(rawTradId);
    const matchedTraditionId = isRealMatch ? rawTradId : null;

    const rawMarkerId = typeof parsed.matchedMarkerId === 'string' ? parsed.matchedMarkerId.trim() : null;
    const matchedMarkerId = matchedTraditionId && rawMarkerId && rawMarkerId !== 'null' && rawMarkerId !== 'none' ? rawMarkerId : null;

    return res.json({
      isCulturalHeritage: true,
      invalidPrompt: null,
      matchedTraditionId,
      matchedMarkerId,
      confidence: parsed.confidence || 'high',
      shortInfo: parsed.shortInfo || null,
      aiDescription: parsed.aiDescription || 'AI visual analysis completed.',
      analysisDetails: {
        visualMotifIdentified: parsed.visualMotifIdentified || 'Cultural Artifact / Motif',
        regionEstimated: parsed.regionEstimated || 'South Asia',
        materialCharacteristics: Array.isArray(parsed.materialCharacteristics) ? parsed.materialCharacteristics : [],
        groundedSourceEvidence: parsed.groundedSourceEvidence || 'Verified Living Heritage Knowledge Base',
      },
    });
  } catch (error: any) {
    console.error('Error in /api/lens/recognize:', error);
    return res.status(500).json({
      error: 'Recognition failed',
      details: error.message,
      isCulturalHeritage: true,
      matchedTraditionId: null,
      confidence: 'none',
      aiDescription: 'Failed to process image via vision engine. Please check API key or image format.',
    });
  }
});

// Conversational AI Heritage Agent API endpoint
app.post('/api/agent/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: 'The Kalai AI Heritage Agent is currently offline. Please ensure GEMINI_API_KEY is configured in your .env file.',
      });
    }

    const systemPrompt = `You are the Kalai AI Heritage Scholar — an erudite, reverent cultural intelligence dedicated to the preservation, documentation, and transmission of South Asian living traditions and intangible cultural heritage.

Core Knowledge & Identity:
1. Grounded in the Kalai Living Heritage Sanctum:
   - Pattamadai Silk Mat Weaving (Tirunelveli): 120-count wild Korai grass split with thumbnails, pit looms, Labbai Muslim heritage, wedding gifts, GI App No. 195.
   - Aathangudi Tiles (Chettinad): Handmade cement tiles poured into brass stencils on glass plates, cured in water, Chettiar mansion architecture, GI App No. 872.
   - Swamimalai Bronze Icons (Thanjavur): Chola lost-wax (cire-perdue) casting, Shilpa Shastra Tala canon, 4:4:1 beeswax-resin formula, alluvial Kaveri clay moulds, GI App No. 126.
2. Expertise in:
   - UNESCO ICH 9-Factor Vitality Assessment Framework (transmission, practitioner numbers, domain of use, documentation quality, etc.).
   - Shilpa Shastras and classical South Indian iconography (Dasa Tala, Angula proportional units).
   - Tamil language terms, inscriptions (Epigraphia Indica, South Indian Inscriptions), and regional cultural contexts.
   - Grassroots participatory documentation missions and ethics (informed consent, zero voice-cloning).

Tone & Persona:
- Warm, scholarly, respectful, articulate, and culturally insightful.
- Avoid generic cliches; use authentic terminology with brief translations when helpful.
- Keep responses concise, engaging, and well-structured with formatting (bullet points, bold text).`;

    // Construct multi-turn contents
    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const turn of history.slice(-6)) {
        if (turn.role && turn.text) {
          contents.push({
            role: turn.role === 'model' ? 'model' : 'user',
            parts: [{ text: turn.text }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const modelNames = ['gemini-3.6-flash', 'gemini-3.7-flash'];
    let replyText = '';
    let lastErr: any = null;

    for (const model of modelNames) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });
        replyText = response.text?.trim() || '';
        if (replyText) break;
      } catch (err: any) {
        lastErr = err;
        console.warn(`Agent chat model ${model} failed, trying next...`, err?.message);
      }
    }

    if (!replyText) {
      throw lastErr || new Error('Failed to generate response');
    }

    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error in /api/agent/chat:', error);
    return res.status(500).json({
      error: 'Chat failed',
      details: error.message,
      reply: 'Apologies, the Kalai Heritage Scholar is momentarily unable to consult the archives. Please try asking again.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Kalai' });
});

async function startServer() {
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
    console.log(`Kalai server running on http://localhost:${PORT}`);
  });
}

startServer();

