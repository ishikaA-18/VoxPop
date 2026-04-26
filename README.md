# 🎙️ VoxPop — Your voice. Your vote. Your VoxPop.

> *কোনো ভোটার যেন বাদ না পড়েন — No voter should be left behind.*
> — Election Commission of India

[![Lighthouse Performance](https://img.shields.io/badge/Performance-93-brightgreen)](https://voxpop-652440308750.us-central1.run.app)
[![Lighthouse Accessibility](https://img.shields.io/badge/Accessibility-96-brightgreen)](https://voxpop-652440308750.us-central1.run.app)
[![Lighthouse Best Practices](https://img.shields.io/badge/Best%20Practices-96-brightgreen)](https://voxpop-652440308750.us-central1.run.app)
[![Lighthouse SEO](https://img.shields.io/badge/SEO-91-brightgreen)](https://voxpop-652440308750.us-central1.run.app)

**🌐 Live Demo:** [https://voxpop-652440308750.us-central1.run.app](https://voxpop-652440308750.us-central1.run.app)
**📁 GitHub:** [https://github.com/ishikaA-18/VoxPop](https://github.com/ishikaA-18/VoxPop)

---

## 📋 Problem Statement

> *"Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way."*
> — PromptWars Virtual, Challenge 2

---

## 💡 Inspiration

An official Election Commission of India pamphlet — *"নির্বাচন সহায়িকা"* — arrived at my home the week before West Bengal's State Assembly election. As a **first-time voter**, I found myself genuinely confused and afraid. Questions I had:

- *"Will anyone know which party I voted for?"*
- *"How are votes counted by just pressing a button?"*
- *"When will this be over so I can go home?"*

These aren't silly questions. They're real fears millions of young Indians carry into the polling booth. **VoxPop was built to remove that fear — in every language of India — one question at a time.**

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Ask VoxPop** | Gemini-powered AI chat with 3 personality modes |
| ⚡ **Gen Z Mode** | Casual, memes, pop culture analogies (max 80 words) |
| 📖 **Classic Mode** | Formal, cites laws/articles, historical context (max 200 words) |
| 😊 **Simple Mode** | Friendly analogies, zero jargon (max 60 words) |
| 🗳️ **EVM Simulator** | ECI-accurate interactive simulator — blue button, red light, VVPAT slip (7 seconds) |
| 📅 **First Vote Predictor** | Enter state + voter card date → get next election dates + eligibility |
| 🧠 **Civic IQ Quiz** | Gemini-generated MCQs with scoring and downloadable badge |
| ⏱️ **Queue Estimator** | Calculates best time to visit booth based on registered voters |
| 🔒 **Trust Module** | Explains ballot anonymity under Representation of the People Act, 1951 |
| 🪪 **EPIC Explainer** | Explains EPIC number with voters.eci.gov.in integration |
| 🌐 **22 Languages** | All Indian scheduled languages — correct script, not transliteration |

---

## 🏗️ Architecture

```
voxpop/
├── public/                  # Frontend (HTML5, CSS3, Vanilla JS)
│   ├── index.html           # Single-page app, 5 sections
│   ├── css/
│   │   ├── main.css         # CSS variables, reset, typography
│   │   ├── components.css   # Cards, buttons, chat, quiz
│   │   └── animations.css   # Intersection Observer animations
│   └── js/
│       ├── app.js           # Router, section switching
│       ├── chat.js          # Gemini chat + personality modes
│       ├── quiz.js          # Quiz logic + Firebase + Canvas badge
│       ├── predictor.js     # First Vote Predictor
│       ├── evm.js           # EVM Simulator
│       └── firebase.js      # Firestore + Analytics
├── data/
│   ├── elections.json       # Known election dates by state
│   └── steps/india.json     # Official ECI voting steps
├── server/
│   ├── index.js             # Express app with Helmet + CORS
│   └── routes/
│       ├── chat.js          # POST /api/chat → Gemini
│       ├── quiz.js          # POST /api/quiz → Gemini MCQs
│       └── predict.js       # POST /api/predict → JSON + Gemini
├── tests/
│   └── api.test.js          # Jest test suite
├── Dockerfile               # node:18-alpine production image
└── .env.example             # Environment variable template
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JS (ES6+), Glassmorphism |
| **Backend** | Node.js, Express.js |
| **AI** | Google Gemini 2.0 Flash (`v1beta`) |
| **Database** | Firebase Firestore |
| **Analytics** | Firebase Analytics |
| **Deployment** | Docker, Google Cloud Run |
| **Security** | Helmet.js, express-rate-limit, input sanitization |

---

## 🌐 Google Services Used

| Service | Usage |
|---|---|
| **Gemini 2.0 Flash** | AI chat, quiz generation, election date prediction |
| **Firebase Firestore** | Quiz score storage per user session |
| **Firebase Analytics** | Feature usage tracking (quiz, chat, predictor, badge) |
| **Google Cloud Run** | Containerized deployment, auto-scaling |
| **Google AI Studio** | System prompt development and testing |

---

## 🔒 Security Implementation

- `GEMINI_API_KEY` stored as Cloud Run environment variable — **never exposed to frontend**
- All inputs sanitized: HTML tags stripped, max 500 characters enforced
- Rate limiting: `/api/chat` → 10 req/min, `/api/quiz` → 5 req/min per IP
- `Helmet.js` for HTTP security headers
- CORS configured to allow only frontend origin
- `.env` in `.gitignore` — only `.env.example` committed

---

## ♿ Accessibility (WCAG AA Compliant)

- `lang="en"` on `<html>` element
- All buttons have `aria-label` attributes
- All images and SVGs have `alt` text or `aria-hidden="true"`
- Correct heading hierarchy: `h1` → `h2` → `h3`
- Full keyboard navigation — Tab through every interactive element
- Color contrast ratio: **5.48:1** (saffron `#E65100` on dark background)
- Focus outlines preserved on all interactive elements
- `aria-live="polite"` on chat window and quiz results
- RTL support for Urdu and Kashmiri
- EVM simulator buttons: `aria-label="Vote for [candidate], [party]"`

---

## ⚡ Performance & Efficiency

- Election steps/timelines served from **local JSON** — zero Gemini calls for static content
- Gemini called **only** for: dynamic chat, quiz generation, unknown election predictions
- Intersection Observer API for lazy animation — no layout thrashing
- Auto-resizing textarea — no fixed height jank
- Graceful fallbacks on all API routes — app works even when Gemini quota is exceeded
- **Lighthouse scores: 93 Performance | 96 Accessibility | 96 Best Practices | 91 SEO**

---

## 📊 Firebase Analytics Events

| Event | Trigger |
|---|---|
| `quiz_started` | User clicks Generate Quiz |
| `quiz_completed` | User answers all 5 questions |
| `badge_downloaded` | User downloads Civic Badge PNG |
| `chat_message_sent` | User sends a chat message |
| `personality_mode_toggled` | User switches Gen Z/Classic/Simple |
| `predictor_used` | User submits First Vote Predictor |
| `language_selected` | User changes language |

---

## 🧪 Test Cases

| # | Input | Expected | Result |
|---|---|---|---|
| 1 | POST /api/chat — "What is EVM?" | 200 + Gemini reply | ✅ |
| 2 | POST /api/quiz — India, Lok Sabha, Easy | 200 + 5 MCQs | ✅ |
| 3 | POST /api/predict — West Bengal, State Assembly | 200 + HAPPENING NOW | ✅ |
| 4 | POST /api/predict — Unknown country | 200 + graceful fallback | ✅ |
| 5 | EVM blue button click | Red light + beep + VVPAT 7s | ✅ |
| 6 | Personality mode switch | Gemini response style changes | ✅ |
| 7 | Language → Bengali | Response in বাংলা script | ✅ |
| 8 | Input > 500 chars | Truncated, not rejected | ✅ |
| 9 | Quiz completion | Score saved to Firestore | ✅ |
| 10 | Badge download | Canvas PNG generated | ✅ |

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/ishikaA-18/VoxPop.git
cd VoxPop

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in GEMINI_API_KEY, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL

# Start the server
node server/index.js

# Open browser
# http://localhost:8080
```

---

## 🐳 Docker

```bash
docker build -t voxpop .
docker run -p 8080:8080 --env-file .env voxpop
```

---

## 🤖 Gemini System Prompt Design

VoxPop uses a carefully crafted system prompt that:
- Enforces **non-partisanship** (never favors any party/candidate)
- Switches **response language and script** based on user selection
- Adapts **tone and length** based on personality mode
- References **official ECI guidelines** and helpline 1950
- Confidently explains **ballot secrecy** under the Representation of the People Act, 1951
- Ends every response with an **engaging follow-up question**

---

## 👩‍💻 Built By

**Ishika Agarwal**
Final Year Engineering Student — Academy of Technology, Adisaptagram, West Bengal
First-time voter. Builder. The person who actually read that ECI pamphlet.

*PromptWars Virtual — Challenge 2 | Hack2skill × Google for Developers*
