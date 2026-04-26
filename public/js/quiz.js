/**
 * quiz.js — VoxPop Election Quiz Module
 * Handles MCQ quiz generation, scoring, badge generation, and social sharing.
 */

'use strict';

const quizModule = (() => {
    // State
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];

    /**
     * @description Simple frontend logger
     */
    const logger = {
        info: (...args) => console.log('[VoxPop INFO]', ...args),
        error: (...args) => console.error('[VoxPop ERROR]', ...args)
    };

    /**
     * @description Initialize quiz module
     */
    function init() {
        buildQuizUI();
        logger.info('Quiz Module Initialized');
    }

    /**
     * @description Build the initial UI for the quiz section
     */
    function buildQuizUI() {
        const section = document.getElementById('my-voxpop');
        if (!section) return;

        section.innerHTML = `
            <div class="section-inner">
                <h2 class="section-title" id="quiz-section-title">My VoxPop 🏆</h2>
                <p class="section-sub" id="quiz-section-sub">Test your knowledge and earn your Civic Badge.</p>

                <div id="quiz-container" class="glass-card quiz-card">
                    <div id="quiz-intro">
                        <h3 id="quiz-intro-title">Are you an Election Expert? 🗳️</h3>
                        <p id="quiz-intro-desc">Take a quick 5-question quiz based on your selected country and election type.</p>
                        <button id="start-quiz-btn" class="btn btn-primary cta-btn">Start Quiz</button>
                    </div>
                    <div id="quiz-content" style="display: none;">
                        <div class="quiz-header">
                            <span id="question-number">Question 1/5</span>
                            <div class="progress-bar"><div id="progress-fill"></div></div>
                        </div>
                        <h4 id="question-text"></h4>
                        <div id="options-container" class="options-grid"></div>
                        <div id="explanation-container" class="explanation-box" style="display: none;"></div>
                        <button id="next-question-btn" class="btn btn-primary" style="display: none;">Next Question</button>
                    </div>
                    <div id="quiz-results" style="display: none;">
                        <h3 id="quiz-complete-title">Quiz Complete! 🎉</h3>
                        <div class="score-display">
                            <span id="final-score">0</span>/5
                        </div>
                        <h4 id="score-title"></h4>
                        <p id="score-message"></p>
                        
                        <div class="badge-section">
                            <canvas id="badge-canvas" width="400" height="400" style="display: none;"></canvas>
                            <img id="badge-preview" class="badge-preview" alt="Your Civic Badge">
                            <button id="download-badge-btn" class="btn btn-primary">Download Badge 📥</button>
                        </div>

                        <div class="share-actions">
                            <button id="linkedin-share-btn" class="btn btn-secondary">Share on LinkedIn 🔗</button>
                            <button id="restart-quiz-btn" class="btn btn-outline">Try Again 🔄</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('start-quiz-btn')?.addEventListener('click', startQuiz);
        document.getElementById('restart-quiz-btn')?.addEventListener('click', restartQuiz);
    }

    /**
     * @description Restart the quiz using cached questions
     */
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        
        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('quiz-content').style.display = 'block';
        
        showQuestion();
    }

    /**
     * @description Start the quiz — fetch questions from API
     * @returns {Promise<void>}
     */
    async function startQuiz() {
        const intro = document.getElementById('quiz-intro');
        const content = document.getElementById('quiz-content');
        if (!intro || !content) return;

        intro.style.display = 'none';
        content.style.display = 'block';

        // Get selections from home page
        const country = document.getElementById('country-select')?.value || 'India';
        const electionType = document.getElementById('election-select')?.value || 'General Election';
        const selectedLanguage = document.getElementById('language-select')?.value || 'English';

        document.getElementById('question-text').textContent = 'Loading questions...';

        try {
            const res = await fetch('/api/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country, electionType, selectedLanguage })
            });
            const data = await res.json();
            questions = data.questions;
            
            // Log analytics
            if (window.voxpopAnalytics) {
                window.voxpopAnalytics.logEvent('quiz_started', { country, electionType });
            }

            showQuestion();
        } catch (err) {
            logger.error('Quiz fetch error:', err);
            document.getElementById('question-text').textContent = 'Error loading questions. Please try again.';
        }
    }

    /**
     * @description Display current question and its options
     */
    function showQuestion() {
        const q = questions[currentQuestionIndex];
        const text = document.getElementById('question-text');
        const options = document.getElementById('options-container');
        const qNum = document.getElementById('question-number');
        const progress = document.getElementById('progress-fill');
        const nextBtn = document.getElementById('next-question-btn');
        const explanation = document.getElementById('explanation-container');

        if (!text || !options) return;

        text.textContent = q.question;
        qNum.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
        progress.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
        
        options.innerHTML = '';
        explanation.style.display = 'none';
        nextBtn.style.display = 'none';

        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleAnswer(index));
            options.appendChild(btn);
        });
    }

    /**
     * @description Handle user's answer selection and update score
     * @param {number} selectedIndex - index of the selected option
     */
    function handleAnswer(selectedIndex) {
        const q = questions[currentQuestionIndex];
        const options = document.querySelectorAll('.option-btn');
        const explanation = document.getElementById('explanation-container');
        const nextBtn = document.getElementById('next-question-btn');

        if (explanation.style.display === 'block') return; // Prevent multiple clicks

        options.forEach((btn, index) => {
            btn.disabled = true;
            if (index === q.correctIndex) {
                btn.classList.add('correct');
            } else if (index === selectedIndex) {
                btn.classList.add('wrong');
            }
        });

        if (selectedIndex === q.correctIndex) {
            score++;
        }

        explanation.textContent = q.explanation;
        explanation.style.display = 'block';
        nextBtn.style.display = 'block';

        nextBtn.onclick = () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        };
    }

    /**
     * @description Show final results and generate civic badge
     */
    function showResults() {
        document.getElementById('quiz-content').style.display = 'none';
        const results = document.getElementById('quiz-results');
        results.style.display = 'block';

        const finalScore = document.getElementById('final-score');
        const title = document.getElementById('score-title');
        const msg = document.getElementById('score-message');

        finalScore.textContent = score;

        let titleText = '';
        let msgText = '';

        if (score === 5) {
            titleText = window.voxpopGetTranslation ? window.voxpopGetTranslation('expert') : 'Election Expert 🏆';
            msgText = 'Incredible! You have a perfect understanding of the democratic process.';
        } else if (score >= 3) {
            titleText = window.voxpopGetTranslation ? window.voxpopGetTranslation('champion') : 'Civic Champion 🎖️';
            msgText = 'Great job! You\'re well-informed and ready to cast your vote.';
        } else {
            titleText = window.voxpopGetTranslation ? window.voxpopGetTranslation('voter') : 'Future Voter 🌱';
            msgText = 'Good start! Democracy is a journey, keep learning.';
        }

        title.textContent = titleText;
        msg.textContent = msgText;

        generateBadge(titleText);
        saveScoreToFirestore(score, titleText);

        // Log analytics
        if (window.voxpopAnalytics) {
            window.voxpopAnalytics.logEvent('quiz_completed', { score, title: titleText });
        }

        document.getElementById('download-badge-btn').onclick = downloadBadge;
        document.getElementById('linkedin-share-btn').onclick = () => shareOnLinkedIn(titleText);
    }

    /**
     * @description Generate badge using HTML Canvas
     * @param {string} title - title earned by the user
     */
    function generateBadge(title) {
        const canvas = document.getElementById('badge-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Clear
        ctx.clearRect(0, 0, 400, 400);

        // Gradient Background
        const grad = ctx.createRadialGradient(200, 200, 50, 200, 200, 200);
        grad.addColorStop(0, '#1b4fd8');
        grad.addColorStop(1, '#0f172a');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(200, 200, 180, 0, Math.PI * 2);
        ctx.fill();

        // Border
        ctx.strokeStyle = '#ff6b00';
        ctx.lineWidth = 10;
        ctx.stroke();

        // Icon (Emoji)
        ctx.font = '80px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🗳️', 200, 180);

        // Title
        ctx.fillStyle = 'white';
        ctx.font = 'bold 30px Arial';
        ctx.fillText('VoxPop', 200, 240);

        ctx.fillStyle = '#ff6b00';
        ctx.font = '24px Arial';
        ctx.fillText(title, 200, 280);

        // Year
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '16px Arial';
        ctx.fillText('2026 ELECTORATE', 200, 320);

        // Preview
        const preview = document.getElementById('badge-preview');
        if (preview) preview.src = canvas.toDataURL('image/png');
    }

    /**
     * @description Download the generated badge image
     */
    function downloadBadge() {
        const canvas = document.getElementById('badge-canvas');
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = 'voxpop-civic-badge.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Log analytics
        if (window.voxpopAnalytics) {
            window.voxpopAnalytics.logEvent('badge_downloaded');
        }
    }

    /**
     * @description Share quiz score on LinkedIn
     * @param {string} title - title earned by the user
     */
    function shareOnLinkedIn(title) {
        const url = window.location.href;
        const text = `I just earned the ${title} badge on VoxPop! 🗳️ Democracy matters, and I'm ready to vote. Check your election IQ here:`;
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`;
        window.open(shareUrl, '_blank');
    }

    /**
     * @description Save quiz score to Firebase Firestore
     * @param {number} score - user's score
     * @param {string} title - title earned
     * @returns {Promise<void>}
     */
    async function saveScoreToFirestore(score, title) {
        if (window.voxpopFirebase && window.voxpopFirebase.saveScore) {
            await window.voxpopFirebase.saveScore({
                score,
                title,
                timestamp: new Date().toISOString(),
                country: document.getElementById('country-select')?.value || 'India'
            });
        }
    }

    return { init };
})();

// Initialize
document.addEventListener('DOMContentLoaded', () => quizModule.init());
