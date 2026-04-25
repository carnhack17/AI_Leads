# 🔥 AI Lead Qualifier + Auto Responder

An AI-powered system that analyzes incoming messages from prospects, scores them, and generates tailored responses.

## Features

- 🤖 **Intelligent Classification**: Uses Claude AI to classify messages (lead, question, spam, support)
- 📊 **Lead Scoring**: Scores leads from 0-100 based on buying intent
- 🎨 **3D Visualization**: Beautiful 3D visualization of lead quality scores
- 💬 **Auto-Response**: Generates tailored responses for different lead temperatures
- 🎯 **Business Decision Making**: Hot, Warm, Cold lead categorization
- 🚀 **Quick Deployment**: Deploy to Netlify with one click

## Tech Stack

- **Frontend**: React + Vite + Three.js for 3D
- **Backend**: Netlify Functions (serverless)
- **AI**: Anthropic Claude API (Opus model - claude-opus-4-1-20250805)
- **Hosting**: Netlify

## Quick Start

### 1. Setup

```bash
# Clone or create the project
cd ai-lead-qualifier

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file:

```
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key from [https://console.anthropic.com/](https://console.anthropic.com/)

### 3. Development

```bash
# Start local dev server (includes Netlify Functions)
npm start
```

Visit `http://localhost:3000`

### 4. Deployment to Netlify

#### Option A: Via GitHub (Recommended)

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ai-lead-qualifier.git
   git push -u origin main
   ```

2. Connect to Netlify:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your GitHub repo
   - Click Deploy

3. Add environment variables in Netlify:
   - Site settings → Build & deploy → Environment
   - Add `ANTHROPIC_API_KEY` with your API key

#### Option B: Direct Deploy

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## How It Works

### The Flow

```
User Message
    ↓
React Frontend (input form)
    ↓
POST /api/lead (Netlify Function)
    ↓
fetch() → Claude API (direct HTTP)
    ↓
JSON Response from Claude
    ↓
Extract text, parse JSON
    ↓
Return to frontend
    ↓
3D Visualization + Results Display
```

### Why No SDK?

The direct `fetch()` approach is:
- ✅ **No dependencies** - fetch is built-in
- ✅ **Smaller bundle** - lighter Netlify functions
- ✅ **Simpler code** - just HTTP requests
- ✅ **Faster cold start** - Netlify functions boot faster

### API Response Example

```json
{
  "intent": "lead",
  "score": 85,
  "sentiment": "positive",
  "reply": "Thanks for reaching out! We'd love to help you scale. Are you available for a quick call this week?",
  "decision": "hot"
}
```

## Lead Temperature Guide

- **🔥 Hot Lead** (80-100): High buying intent → Suggest a call
- **🟠 Warm Lead** (40-79): Interested but not ready → Nurture conversation
- **❄️ Cold Lead** (0-39): Low interest → Polite, short response

## Customization

### Modify the AI Prompt

Edit `netlify/functions/lead.js` - change the prompt to customize scoring rules:

```javascript
// Update this section to change how leads are classified
content: `You are a sales AI assistant. Analyze this message...`
```

### Change 3D Visualization Colors

Edit `src/components/ScoreVisualization.jsx`:

```javascript
if (decision === "hot") {
  color = new THREE.Color(0xff4444); // Change hex color
}
```

## File Structure

```
├── netlify/
│   └── functions/
│       └── lead.js          # Backend - Claude API calls
├── src/
│   ├── components/
│   │   ├── InputForm.jsx    # Message input form
│   │   ├── Results.jsx      # Results display
│   │   └── ScoreVisualization.jsx  # 3D visualization
│   ├── App.jsx              # Main app component
│   └── main.jsx             # React entry point
├── index.html               # HTML entry point
├── netlify.toml             # Netlify configuration
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

## Troubleshooting

### CORS errors during development

The `vite.config.js` proxies API requests to localhost:9000 (Netlify Dev). Make sure to run `netlify dev` or `npm start`.

### API Key not working

- Verify your key at [console.anthropic.com](https://console.anthropic.com)
- Check that the `.env` file is in the root directory
- In Netlify, verify the environment variable is set

## Use Cases

- **Agencies**: White-label for clients
- **Freelancers**: Automate lead qualification
- **Startups**: Scale lead nurturing
- **Local Businesses**: Filter inquiry messages

## Pricing

This uses Anthropic's **Opus model** (claude-opus-4-1-20250805) for the highest accuracy in lead classification. Perfect for businesses that want the best AI analysis.

**Cost estimate**: ~$3-5 per 1000 analyzed messages (depending on message length)

## Next Steps

- Add CRM integration (HubSpot, Pipedrive)
- Email auto-send replies
- Lead dashboard with history
- Sentiment analysis trends
- A/B test different reply templates

---

**Made for agencies, freelancers, and businesses.** Powered by Claude AI.
