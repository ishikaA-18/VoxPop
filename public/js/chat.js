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
     * @description Simple frontend logger
     */
    const logger = {
        info: (...args) => console.log('[VoxPop INFO]', ...args),
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
    function init() {
        buildChatUI();
        attachEvents();
        logger.info('Chat Module Initialized');
    }

    /**
     * @description Build the entire chat section UI
     */
    function buildChatUI() {
        const section = document.getElementById('ask');
        if (!section) return;

        section.innerHTML = `
      <div class="section-inner">
        <h2 class="section-title">Ask VoxPop 🎙️</h2>
        <p class="section-sub">Ask anything about elections. No judgment, no jargon.</p>

        <!-- Personality Mode Toggle -->
        <div class="mode-toggle" role="tablist" aria-label="Choose response style">
          <button class="mode-btn active" role="tab" aria-selected="true"
            data-mode="simple" aria-label="Simple mode - easy explanations">
            😊 Simple
            <span class="mode-desc">Keep It Easy</span>
          </button>
          <button class="mode-btn" role="tab" aria-selected="false"
            data-mode="genZ" aria-label="Gen Z mode - casual and fun">
            ⚡ Gen Z
            <span class="mode-desc">Short & Spicy</span>
          </button>
          <button class="mode-btn" role="tab" aria-selected="false"
            data-mode="classic" aria-label="Classic mode - detailed and formal">
            📖 Classic
            <span class="mode-desc">Deep Dive</span>
          </button>
        </div>

        <!-- Example Prompt Chips -->
        <div class="prompt-chips" aria-label="Example questions">
          ${examplePrompts.map(p => `
            <button class="chip" aria-label="Ask: ${p}">${p}</button>
          `).join('')}
        </div>

        <!-- Chat Window -->
        <div class="chat-window" id="chatWindow" 
          role="log" aria-live="polite" aria-label="Chat conversation">
          <div class="chat-welcome">
            <span class="bot-avatar" aria-hidden="true">🎙️</span>
            <div class="chat-bubble bot-bubble">
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
     * @description Attach all event listeners for UI elements
     */
    function attachEvents() {
        // Mode toggle buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                personalityMode = btn.dataset.mode;

                // Log analytics event
                if (window.voxpopAnalytics) {
                    window.voxpopAnalytics.logEvent('personality_mode_toggled', {
                        mode: personalityMode
                    });
                }
            });
        });

        // Example prompt chips
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

        // Send button
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }

        // Enter key to send (Shift+Enter for new line)
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });

            // Character counter and auto-resize with debounce
            const debouncedInput = debounce(() => {
                updateCharCounter(chatInput.value.length);
                // Auto-resize textarea
                chatInput.style.height = 'auto';
                chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
            }, 300);

            chatInput.addEventListener('input', debouncedInput);
        }

        // Language badge click — scroll to home language selector
        const langBadge = document.getElementById('langBadge');
        if (langBadge) {
            langBadge.addEventListener('click', () => {
                document.getElementById('language-select')?.scrollIntoView({ behavior: 'smooth' });
            });
            langBadge.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') langBadge.click();
            });
        }

        // Listen for language changes from home page selector
        document.getElementById('language-select')?.addEventListener('change', (e) => {
            updateLangBadge(e.target.value);
        });
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
    async function sendMessage() {
        if (isWaiting) return;

        const input = document.getElementById('chatInput');
        const message = input?.value?.trim();
        if (!message) return;

        // Get current selections
        const country = document.getElementById('country-select')?.value || 'India';
        const electionType = document.getElementById('election-select')?.value || 'General Election';
        const selectedLanguage = document.getElementById('language-select')?.value || 'English';

        // Clear input
        input.value = '';
        input.style.height = 'auto';
        updateCharCounter(0);

        // Add user message to UI
        appendMessage('user', message);

        // Add to history
        conversationHistory.push({ role: 'user', content: message });
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }

        // Show typing indicator
        showTyping();
        isWaiting = true;
        setInputDisabled(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    country,
                    electionType,
                    personalityMode,
                    selectedLanguage,
                    conversationHistory: conversationHistory.slice(-10)
                })
            });

            const data = await res.json();
            removeTyping();

            if (res.ok && data.reply) {
                appendMessage('bot', data.reply);
                conversationHistory.push({ role: 'assistant', content: data.reply });

                // Log analytics
                if (window.voxpopAnalytics) {
                    window.voxpopAnalytics.logEvent('chat_message_sent', {
                        personalityMode,
                        language: selectedLanguage
                    });
                }
            } else {
                appendMessage('bot', "VoxPop is thinking... try again in a moment 🙏");
            }
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