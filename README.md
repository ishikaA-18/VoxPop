# VoxPop 🎙️ | Your Voice. Your Vote.

**VoxPop** is an AI-powered election education assistant designed to make the democratic process accessible, engaging, and jargon-free for first-time voters. Built for the **PromptWars Challenge 2**, it combines the power of Gemini AI with a premium, accessible UI to ensure no voter is left behind.

---

## 📖 The Story Behind VoxPop

It was a sweltering afternoon in **West Bengal**. I remember watching my cousin, a first-time voter, staring blankly at a colorful but dense **ECI (Election Commission of India) pamphlet**. It was filled with "Constituencies," "Phases," and "VVPAT" — words that felt more like a textbook than a celebration of democracy.

"Will anyone know who I voted for?" she asked, her voice tinged with a genuine, quiet anxiety that no pamphlet could soothe. "And how do I even know which button to press without looking like I don't belong there?"

That moment stayed with me. Democracy shouldn't feel like a test you're afraid to fail. It should feel like a conversation. VoxPop was born from that pamphlet — a digital companion that speaks your language (literally!), understands your culture, and replaces anxiety with confidence. Whether it's the **HAPPENING NOW** energy of a Bengal State Assembly election or a local municipal poll, VoxPop is there to say: *"Don't worry, here's exactly what happens next."*

---

## 🚀 Key Features

- **🤖 Ask VoxPop**: A multi-modal AI chat that adapts to your style. Choose between **Simple** (easy analogies), **Gen Z** (casual & spicy), or **Classic** (detailed & formal).
- **🗳️ EVM Simulator**: A high-fidelity, ECI-compliant simulator to practice your vote. Hear the beep, see the red light, and watch the VVPAT slip — so you're ready for the real thing.
- **🏆 My VoxPop Quiz**: Test your election IQ with Gemini-generated MCQs. Earn a custom **Civic Badge** (generated on-the-fly via Canvas) and share your "Election Expert" status on LinkedIn.
- **📅 Election Predictor**: "When's My First Vote?" Enter your DOB and location to see your next election date. Features live status tracking (e.g., **West Bengal Assembly LIVE**).
- **⏱️ Queue Time Estimator**: Plan your visit with our algorithm that estimates booth wait times based on registration numbers and time of day.

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (with Modern Glassmorphism), and Javascript (ES6+).
- **Backend**: Node.js & Express.
- **AI Engine**: Google Gemini API (`gemini-2.0-flash`).
- **Analytics & DB**: Firebase Analytics & Cloud Firestore.
- **Deployment**: Docker & Google Cloud Run.

---

## ♿ Accessibility & Analytics

- **Accessibility**: Audited for WCAG AA compliance. High-contrast color palettes (Saffron #E65100), full ARIA support, and keyboard-friendly navigation.
- **Analytics**: Instrumented with Firebase to track `quiz_completed`, `badge_downloaded`, `predictor_used`, and `chat_engagement`.

---

## 🐳 Docker Setup

To run VoxPop locally using Docker:

1. **Clone the repo**:
   ```bash
   git clone https://github.com/ishikaA-18/VoxPop.git
   cd VoxPop
   ```

2. **Set up Environment Variables**:
   Create a `.env` file with your `GEMINI_API_KEY`.

3. **Build and Run**:
   ```bash
   docker build -t voxpop .
   docker run -p 8080:8080 --env-file .env voxpop
   ```

4. **Access the App**:
   Open `http://localhost:8080` in your browser.

---

## 🤝 Acknowledgments

VoxPop is built with love for democracy and deep respect for the **Election Commission of India's** mission: *"No Voter to be Left Behind."*

**Built by Ishika Agarwal for PromptWars Challenge 2.**
