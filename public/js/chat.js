/**
 * chat.js — Ask VoxPop AI Chat Module
 * Handles personality modes, language-aware chat, and Gemini API integration
 */

'use strict';

const chatModule = (() => {
    // State
    let conversationHistory = [];
    let personalityMode = 'simple';
    let isWaiting = false;

    /**
     * @description Simple frontend logger (silenced info for production)
     */
    const logger = {
        info: () => {}, // Disabled for production
        error: (...args) => console.error('[VoxPop ERROR]', ...args)
    };

    // Example prompts shown to user
    const examplePrompts = [
        "When will voting be over so I can go home? 😅",
        "Will anyone know which party I voted for?",
        "How are votes counted by just pressing buttons?",
        "What do I bring to the polling booth?",
        "What happens if my name isn't on the voter list?"
    ];

    /**
     * @description Initialize chat module — build UI and attach events
     */
    /**
     * @description Initialize chat module — build UI and attach events
     */
    function init() {
        buildChatUI();
        attachEvents();
    }

    /**
     * @description Build the entire chat section UI
     */
    function buildChatUI() {
        const section = document.getElementById('ask');
        if (!section) return;

        section.innerHTML = `
      <div class="section-inner">
        <h2 class="section-title" id="chat-section-title">Ask VoxPop 🎙️</h2>
        <p class="section-sub" id="chat-section-sub">Ask anything about elections. No judgment, no jargon.</p>

        <!-- Personality Mode Toggle -->
        <div class="mode-toggle" role="tablist" aria-label="Choose response style">
          <button class="mode-btn active" role="tab" aria-selected="true"
            data-mode="simple" aria-label="Simple mode - easy explanations">
            <span id="mode-simple-label">😊 Simple</span>
            <span class="mode-desc" id="mode-simple-desc">Keep It Easy</span>
          </button>
          <button class="mode-btn" role="tab" aria-selected="false"
            data-mode="genZ" aria-label="Gen Z mode - casual and fun">
            <span id="mode-genZ-label">⚡ Gen Z</span>
            <span class="mode-desc" id="mode-genZ-desc">Short & Spicy</span>
          </button>
          <button class="mode-btn" role="tab" aria-selected="false"
            data-mode="classic" aria-label="Classic mode - detailed and formal">
            <span id="mode-classic-label">📖 Classic</span>
            <span class="mode-desc" id="mode-classic-desc">Deep Dive</span>
          </button>
        </div>

        <!-- Example Prompt Chips -->
        <div class="prompt-chips" id="prompt-chips-container" aria-label="Example questions">
          ${examplePrompts.map((p, i) => `
            <button class="chip" id="prompt-chip-${i + 1}" aria-label="Ask: ${p}">${p}</button>
          `).join('')}
        </div>

        <!-- Chat Window -->
        <div class="chat-window" id="chatWindow" 
          role="log" aria-live="polite" aria-label="Chat conversation">
          <div class="chat-welcome">
            <span class="bot-avatar" aria-hidden="true">🎙️</span>
            <div class="chat-bubble bot-bubble" id="chat-welcome-text">
              Hi! I'm VoxPop 👋 I'm here to answer all your election questions — 
              no matter how basic they seem. What would you like to know?
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="chat-input-area">
          <div class="lang-badge" id="langBadge" 
            aria-label="Current language" role="button" tabindex="0">
            🇮🇳 English
          </div>
          <div class="input-wrapper">
            <label for="chatInput" class="visually-hidden">Ask VoxPop your election question</label>
            <textarea
              id="chatInput"
              class="chat-input"
              placeholder="Ask VoxPop anything about voting..."
              maxlength="500"
              rows="1"
              aria-label="Type your election question here"
              aria-multiline="true"
            ></textarea>
            <span class="char-counter" id="charCounter">0/500</span>
          </div>
          <button class="send-btn" id="sendBtn" aria-label="Send message">➤</button>
        </div>
      </div>
    `;
    }

    /**
     * @description Attaches mode toggle button listeners
     */
    function attachModeToggle() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                personalityMode = btn.dataset.mode;
                if (window.voxpopAnalytics) {
                    window.voxpopAnalytics.logEvent('personality_mode_toggled', { mode: personalityMode });
                }
            });
        });
    }

    /**
     * @description Attaches prompt chip click listeners
     */
    function attachPromptChips() {
        document.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const input = document.getElementById('chatInput');
                if (input) {
                    input.value = chip.textContent;
                    updateCharCounter(chip.textContent.length);
                    input.focus();
                }
            });
        });
    }

    /**
     * @description Attaches send button and keyboard input listeners
     */
    function attachInputEvents() {
        document.getElementById('sendBtn')?.addEventListener('click', sendMessage);

        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
            const debouncedInput = debounce(() => {
                updateCharCounter(chatInput.value.length);
                chatInput.style.height = 'auto';
                chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
            }, 300);
            chatInput.addEventListener('input', debouncedInput);
        }
    }

    /**
     * @description Attaches language badge and selector listeners
     */
    function attachLanguageEvents() {
        const langBadge = document.getElementById('langBadge');
        if (langBadge) {
            langBadge.addEventListener('click', () => {
                document.getElementById('language-select')?.scrollIntoView({ behavior: 'smooth' });
            });
            langBadge.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') langBadge.click();
            });
        }
        document.getElementById('language-select')?.addEventListener('change', (e) => {
            updateLangBadge(e.target.value);
        });
    }

    /**
     * @description Attach all event listeners for UI elements
     */
    function attachEvents() {
        attachModeToggle();
        attachPromptChips();
        attachInputEvents();
        attachLanguageEvents();
    }

    /**
     * @description Update character counter display
     * @param {number} len - current input length
     */
    function updateCharCounter(len) {
        const counter = document.getElementById('charCounter');
        if (counter) {
            counter.textContent = `${len}/500`;
            counter.style.color = len > 450 ? 'var(--accent-saffron)' : 'var(--text-secondary)';
        }
    }

    /**
     * @description Update language badge text
     * @param {string} lang - selected language name
     */
    function updateLangBadge(lang) {
        const badge = document.getElementById('langBadge');
        if (badge) badge.textContent = `🇮🇳 ${lang}`;
    }

    /**
     * @description Send message to VoxPop API and handle response
     * @returns {Promise<void>}
     */
    /**
     * @description Reads user input, clears the field, and updates UI
     * @returns {{message: string, country: string, electionType: string, selectedLanguage: string}|null} Payload or null if empty
     */
    function prepareMessagePayload() {
        const input = document.getElementById('chatInput');
        const message = input?.value?.trim();
        if (!message) return null;

        const country = document.getElementById('country-select')?.value || 'India';
        const electionType = document.getElementById('election-select')?.value || 'General Election';
        const selectedLanguage = document.getElementById('language-select')?.value || 'English';

        input.value = '';
        input.style.height = 'auto';
        updateCharCounter(0);

        return { message, country, electionType, selectedLanguage };
    }

    /**
     * @description Adds a message to conversation history, trimming if too long
     * @param {string} role - 'user' or 'assistant'
     * @param {string} content - The message content
     */
    function addToHistory(role, content) {
        conversationHistory.push({ role, content });
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }
    }

    /**
     * @description Calls the chat API and handles the response
     * @param {Object} payload - The message payload
     * @returns {Promise<void>}
     */
    async function fetchChatReply(payload) {
        const { message, country, electionType, selectedLanguage } = payload;
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message, country, electionType, personalityMode,
                selectedLanguage,
                conversationHistory: conversationHistory.slice(-10)
            })
        });
        const data = await res.json();
        removeTyping();

        if (res.ok && data.reply) {
            appendMessage('bot', data.reply);
            addToHistory('assistant', data.reply);
            if (window.voxpopAnalytics) {
                window.voxpopAnalytics.logEvent('chat_message_sent', { personalityMode, language: selectedLanguage });
            }
        } else {
            appendMessage('bot', "VoxPop is thinking... try again in a moment 🙏");
        }
    }

    /**
     * @description Send message to VoxPop API and handle response
     * @returns {Promise<void>}
     */
    async function sendMessage() {
        if (isWaiting) return;

        const payload = prepareMessagePayload();
        if (!payload) return;

        appendMessage('user', payload.message);
        addToHistory('user', payload.message);

        showTyping();
        isWaiting = true;
        setInputDisabled(true);

        try {
            await fetchChatReply(payload);
        } catch (err) {
            removeTyping();
            appendMessage('bot', "VoxPop is thinking... try again in a moment 🙏");
            logger.error('Chat error:', err);
        } finally {
            isWaiting = false;
            setInputDisabled(false);
            document.getElementById('chatInput')?.focus();
        }
    }

    /**
     * @description Append a message bubble to the chat window
     * @param {string} role - 'user' or 'bot'
     * @param {string} text - message content
     */
    function appendMessage(role, text) {
        const chatWindow = document.getElementById('chatWindow');
        if (!chatWindow) return;

        const wrapper = document.createElement('div');
        wrapper.className = `chat-message ${role}-message`;
        wrapper.setAttribute('role', 'article');
        wrapper.setAttribute('aria-label', `${role === 'user' ? 'You' : 'VoxPop'} said: ${text}`);

        if (role === 'bot') {
            wrapper.innerHTML = `
        <span class="bot-avatar" aria-hidden="true">🎙️</span>
        <div class="chat-bubble bot-bubble">${escapeHtml(text)}</div>
      `;
        } else {
            wrapper.innerHTML = `
        <div class="chat-bubble user-bubble">${escapeHtml(text)}</div>
      `;
        }

        chatWindow.appendChild(wrapper);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    /**
     * @description Show typing indicator in the chat window
     */
    function showTyping() {
        const chatWindow = document.getElementById('chatWindow');
        if (!chatWindow) return;

        const typing = document.createElement('div');
        typing.className = 'chat-message bot-message typing-indicator-wrapper';
        typing.id = 'typingIndicator';
        typing.setAttribute('aria-label', 'VoxPop is typing');
        typing.setAttribute('aria-busy', 'true');
        typing.innerHTML = `
      <span class="bot-avatar" aria-hidden="true">🎙️</span>
      <div class="chat-bubble bot-bubble typing-indicator">
        <span></span><span></span><span></span>
      </div>
    `;
        chatWindow.appendChild(typing);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    /**
     * @description Remove typing indicator from the chat window
     */
    function removeTyping() {
        document.getElementById('typingIndicator')?.remove();
    }

    /**
     * @description Enable or disable chat input elements
     * @param {boolean} disabled - whether to disable input
     */
    function setInputDisabled(disabled) {
        const input = document.getElementById('chatInput');
        const btn = document.getElementById('sendBtn');
        if (input) input.disabled = disabled;
        if (btn) {
            btn.disabled = disabled;
            btn.setAttribute('aria-busy', disabled.toString());
        }
    }

    /**
     * @description Escape HTML to prevent XSS
     * @param {string} str - raw string
     * @returns {string} - escaped string
     */
    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/\n/g, '<br>');
    }

    /**
     * @description Debounce utility to limit execution rate
     * @param {Function} func - function to debounce
     * @param {number} wait - milliseconds to wait
     * @returns {Function} - debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    return { init, updateLangBadge };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => chatModule.init());