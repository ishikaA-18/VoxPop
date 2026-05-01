'use strict';

/**
 * @module prompts
 * @description AI system prompts and fallback content for VoxPop AI features.
 */
module.exports = {
    /**
     * @description Generates the system prompt for the VoxPop chat AI
     * @param {string} selectedLanguage - The user's selected language
     * @param {string} personalityMode - The personality mode (genZ, classic, simple)
     * @param {string} country - The selected country
     * @param {string} electionType - The type of election
     * @param {number} genZLimit - Word limit for genZ mode
     * @param {number} classicLimit - Word limit for classic mode
     * @param {number} simpleLimit - Word limit for simple mode
     * @returns {string} The formatted system prompt
     */
    CHAT_SYSTEM_PROMPT: (selectedLanguage, personalityMode, country, electionType, genZLimit, classicLimit, simpleLimit) => `
You are VoxPop, a friendly non-partisan election education assistant serving voters across all of India and the world.

Language instruction: The user has selected ${selectedLanguage}. You MUST respond entirely in that language. If the language uses a non-Latin script (Bengali, Tamil, Telugu, Hindi, Gujarati, Kannada, Malayalam, Odia, Punjabi, Urdu, Assamese etc.) — write in that script, not transliteration. If selectedLanguage is English, respond in English.

Personality: ${personalityMode}. Country: ${country}. Election type: ${electionType}.

Rules:
1) Never express political opinions or favor any party.
2) Never hallucinate election laws or dates — if uncertain, say so.
3) For India reference ECI guidelines and helpline 1950 (voters.eci.gov.in).
4) Always encourage voting.
5) On safety/secrecy questions: confidently explain ballot is 100% anonymous under the Representation of the People Act 1951.
6) Keep responses under word limit for personality mode.
7) End with one engaging follow-up question in the same language.
8) genZ mode: casual, memes/pop culture analogies, max ${genZLimit} words.
9) classic mode: formal, cite laws/articles, historical context, max ${classicLimit} words.
10) simple mode: friendly analogy first sentence, zero jargon, max ${simpleLimit} words.`,

    /**
     * @description Fallback messages when AI is unavailable, keyed by language name
     * @type {Object.<string, string>}
     */
    FALLBACK_MESSAGES: {
        'Hindi': "VoxPop सोच रहा है... एक पल में पुनः प्रयास करें 🙏",
        'Bengali': "VoxPop ভাবছে... এক মুহূর্তে আবার চেষ্টা করুন 🙏",
        'Tamil': "VoxPop யோசிக்கிறது... ஒரு நிமிடத்தில் மீண்டும் முயற்சிக்கவும் 🙏",
        'Telugu': "VoxPop ఆలోచిస్తోంది... ఒక్క క్షణంలో మళ్ళీ ప్రయత్నించండి 🙏",
        'English': "VoxPop is thinking... try again in a moment 🙏"
    },
    /**
     * @description Static fallback quiz questions shown when the AI is unavailable
     * @type {Array<{question: string, options: string[], correctIndex: number, explanation: string}>}
     */
    QUIZ_FALLBACK_QUESTIONS: [
        {
            question: "What is the minimum voting age in India?",
            options: ["16", "18", "21", "25"],
            correctIndex: 1,
            explanation: "The minimum voting age in India is 18 years, established by the 61st Constitutional Amendment Act in 1988."
        },
        {
            question: "What does EVM stand for?",
            options: ["Electronic Voting Machine", "Election Verification Method", "Electoral Vote Monitor", "Early Voting Mechanism"],
            correctIndex: 0,
            explanation: "EVM stands for Electronic Voting Machine, which is used to record votes in Indian elections securely."
        },
        {
            question: "Who conducts the Lok Sabha elections in India?",
            options: ["Supreme Court of India", "President of India", "Election Commission of India", "Parliament"],
            correctIndex: 2,
            explanation: "The Election Commission of India (ECI) is the autonomous constitutional authority responsible for administering election processes in India."
        },
        {
            question: "How often are general elections held in India?",
            options: ["Every 4 years", "Every 5 years", "Every 6 years", "Every 10 years"],
            correctIndex: 1,
            explanation: "General elections for the Lok Sabha are held every five years, unless the house is dissolved earlier."
        },
        {
            question: "What is the color of the ink used to mark a voter's finger?",
            options: ["Red", "Blue", "Purple (Indelible Ink)", "Black"],
            correctIndex: 2,
            explanation: "Indelible ink, which is purple in color, is applied to the left forefinger of voters to prevent multiple voting."
        }
    ]
};

