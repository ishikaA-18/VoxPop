/**
 * app.js — Main Application Logic
 * Handles localization, UI interactions, and general page setup.
 */

'use strict';

const translations = {
    en: {
        title: "Your voice. Your vote. Your VoxPop.",
        subtitle: "The friendly guide every first-time voter deserves.",
        secondary: "কোনো ভোটার যেন বাদ না পড়েন — No voter should be left behind.",
        cta: "Start My Journey →",
        card1Title: "Learn the Process",
        card1Desc: "Step by step from registration to results.",
        card2Title: "Ask VoxPop",
        card2Desc: "Get instant AI answers in your style and language.",
        card3Title: "Know Your Next Vote",
        card3Desc: "Find out when you can vote next.",
        learnTitle: "Learn About Elections",
        learnSubtitle: "Your step-by-step guide to democracy.",
        step1Title: "<span aria-hidden=\"true\">🏛️</span> What is an election?",
        step1Desc: "How democracy works, why your vote matters.",
        step2Title: "<span aria-hidden=\"true\">✅</span> Who can vote?",
        step2Desc: "Age 18+, Indian citizen, registered voter.",
        step3Title: "<span aria-hidden=\"true\">📝</span> How to register?",
        step3Desc: "Voter ID, Form 6, online at voters.eci.gov.in.",
        step4Title: "<span aria-hidden=\"true\">🗓️</span> Election phases & timelines",
        step4Desc: "How India conducts phased elections.",
        step5Title: "<span aria-hidden=\"true\">🏫</span> Voting day process",
        step5Desc: "From arriving at booth to casting vote.",
        step6Title: "<span aria-hidden=\"true\">🖥️</span> How votes are counted",
        step6Desc: "EVM tallying, VVPAT cross-check, results.",
        step7Title: "<span aria-hidden=\"true\">🏆</span> Results & what happens next",
        step7Desc: "Winner announcement, government formation.",
        tellMeMore: "Tell me more &rarr;",

        // Voting Day Guide
        vdTitle: "Voting Day Experience",
        vdGuideTitle: "Step by Step Booth Guide",
        bg1Title: "<span aria-hidden=\"true\">🧾</span> Check your name & booth",
        bg1Desc: "Confirm name on Electoral Roll at voters.eci.gov.in or call 1950. Use Voter Helpline App Booth Navigator for GPS directions.",
        bg2Title: "<span aria-hidden=\"true\">🧍</span> Stand in queue orderly",
        bg2Desc: "Separate queues exist for senior citizens and differently-abled voters.",
        bg3Title: "<span aria-hidden=\"true\">✅</span> Identity verification",
        bg3Desc: "Polling Officer checks your name in voter list + verifies ID.",
        bg4Title: "<span aria-hidden=\"true\">☝️</span> Ink mark + ticket + signature",
        bg4Desc: "Indelible ink on LEFT hand finger, receive ticket, give signature.",
        bg5Title: "<span aria-hidden=\"true\">🚪</span> Enter voting compartment",
        bg5Desc: "Hand over ticket, Presiding Officer activates Ballot Unit, you enter alone — completely private.",
        bg6Title: "<span aria-hidden=\"true\">🔵</span> Press the BLUE button",
        bg6Desc: "Press the blue button next to your chosen candidate's name and symbol.",
        bg7Title: "<span aria-hidden=\"true\">🔴</span> RED light + BEEP",
        bg7Desc: "A red light glows and a beep sounds confirming your vote. If NO light or beep → immediately inform the Presiding Officer.",
        bg8Title: "<span aria-hidden=\"true\">🧾</span> Verify on VVPAT",
        bg8Desc: "Slip shows candidate name, symbol and number for exactly 7 seconds. Slip is NOT given to you — it auto-drops into a sealed box.",
        bgNotaNote: "Note: \"NOTA (None Of The Above) is always the LAST option on the EVM.\"",

        evmTitle: "Try it yourself — this is exactly how it works at the booth 🗳️",
        evmSubtitle: "In the real EVM, a RED light glows and a beep confirms your vote",

        queueTitle: "Queue Time Estimator ⏱️",
        labelVoters: "How many voters are registered at your booth?",
        labelTime: "What time are you planning to go?",
        calcQueueBtn: "Calculate Wait Time",

        trustTitle: "Will anyone know how I voted?",
        trustDesc: "EVM records only a number — not your name, face, or ID. Protected by the Representation of the People Act, 1951. Even the President of India's vote cannot be traced.",
        trustHighlight: "Your vote is 100% anonymous — always.",
        trustHelp: "Feeling threatened? Call Election Commission Helpline: 1950",

        epicTitle: "🪪 What is your EPIC Number?",
        epicDesc: "EPIC = Elector's Photo Identity Card — unique ID on your Voter ID card.",
        epicBtn: "Check yours at voters.eci.gov.in &rarr;"
    },
    hi: {
        title: "आपकी आवाज़। आपका वोट। आपका VoxPop।",
        subtitle: "हर पहली बार वोट देने वाले का दोस्ताना मार्गदर्शक।",
        secondary: "कोई भी मतदाता पीछे न छूटे — No voter should be left behind.",
        cta: "मेरी यात्रा शुरू करें →",
        card1Title: "प्रक्रिया जानें",
        card1Desc: "पंजीकरण से लेकर परिणाम तक हर कदम।",
        card2Title: "VoxPop से पूछें",
        card2Desc: "अपनी शैली और भाषा में तुरंत AI उत्तर पाएं।",
        card3Title: "अपना अगला वोट जानें",
        card3Desc: "जानें कि आप अगली बार कब वोट दे सकते हैं।",
        learnTitle: "चुनाव के बारे में जानें",
        learnSubtitle: "लोकतंत्र के लिए आपका चरण-दर-चरण मार्गदर्शक।",
        step1Title: "<span aria-hidden=\"true\">🏛️</span> चुनाव क्या है?",
        step1Desc: "लोकतंत्र कैसे काम करता है, आपका वोट क्यों मायने रखता है।",
        step2Title: "<span aria-hidden=\"true\">✅</span> कौन वोट दे सकता है?",
        step2Desc: "उम्र 18+, भारतीय नागरिक, पंजीकृत मतदाता।",
        step3Title: "<span aria-hidden=\"true\">📝</span> पंजीकरण कैसे करें?",
        step3Desc: "वोटर आईडी, फॉर्म 6, voters.eci.gov.in पर ऑनलाइन।",
        step4Title: "<span aria-hidden=\"true\">🗓️</span> चुनाव चरण और समय-सीमा",
        step4Desc: "भारत कैसे चरणबद्ध चुनाव आयोजित करता है।",
        step5Title: "<span aria-hidden=\"true\">🏫</span> मतदान के दिन की प्रक्रिया",
        step5Desc: "बूथ पर पहुंचने से लेकर वोट डालने तक।",
        step6Title: "<span aria-hidden=\"true\">🖥️</span> वोटों की गिनती कैसे होती है",
        step6Desc: "EVM टैली, VVPAT क्रॉस-चेक, परिणाम।",
        step7Title: "<span aria-hidden=\"true\">🏆</span> परिणाम और आगे क्या होता है",
        step7Desc: "विजेता की घोषणा, सरकार का गठन।",
        tellMeMore: "मुझे और बताएं &rarr;",

        // Voting Day Guide
        vdTitle: "मतदान दिवस का अनुभव",
        vdGuideTitle: "बूथ गाइड (चरण-दर-चरण)",
        bg1Title: "<span aria-hidden=\"true\">🧾</span> अपना नाम और बूथ जांचें",
        bg1Desc: "voters.eci.gov.in या 1950 पर कॉल करें। GPS के लिए वोटर हेल्पलाइन ऐप का उपयोग करें।",
        bg2Title: "<span aria-hidden=\"true\">🧍</span> कतार में खड़े हों",
        bg2Desc: "वरिष्ठ नागरिकों और दिव्यांगों के लिए अलग कतारें।",
        bg3Title: "<span aria-hidden=\"true\">✅</span> पहचान सत्यापन",
        bg3Desc: "मतदान अधिकारी आपका नाम और आईडी सत्यापित करेगा।",
        bg4Title: "<span aria-hidden=\"true\">☝️</span> स्याही + पर्ची + हस्ताक्षर",
        bg4Desc: "बाएं हाथ की उंगली पर स्याही, पर्ची प्राप्त करें, हस्ताक्षर करें।",
        bg5Title: "<span aria-hidden=\"true\">🚪</span> वोटिंग कंपार्टमेंट में प्रवेश करें",
        bg5Desc: "पर्ची दें, अधिकारी मशीन चालू करेगा, आप अकेले प्रवेश करेंगे।",
        bg6Title: "<span aria-hidden=\"true\">🔵</span> नीला बटन दबाएं",
        bg6Desc: "अपने उम्मीदवार के सामने नीला बटन दबाएं।",
        bg7Title: "<span aria-hidden=\"true\">🔴</span> लाल बत्ती + बीप",
        bg7Desc: "लाल बत्ती जलेगी और बीप की आवाज आपके वोट की पुष्टि करेगी।",
        bg8Title: "<span aria-hidden=\"true\">🧾</span> VVPAT पर जांचें",
        bg8Desc: "पर्ची 7 सेकंड तक दिखाई देगी। फिर वह सीलबंद बॉक्स में गिर जाएगी।",
        bgNotaNote: "नोट: NOTA (इनमें से कोई नहीं) हमेशा EVM पर अंतिम विकल्प होता है।",

        evmTitle: "इसे खुद आजमाएं — बूथ पर बिल्कुल ऐसा ही होता है 🗳️",
        evmSubtitle: "असली EVM में, लाल बत्ती और बीप आपके वोट की पुष्टि करती है",

        queueTitle: "कतार समय अनुमानक ⏱️",
        labelVoters: "आपके बूथ पर कितने मतदाता हैं?",
        labelVoters: "आपके बूथ पर कितने मतदाता हैं?",
        labelTime: "आप किस समय जाने की योजना बना रहे हैं?",
        calcQueueBtn: "प्रतीक्षा समय की गणना करें",

        trustTitle: "क्या किसी को पता चलेगा कि मैंने किसे वोट दिया?",
        trustDesc: "EVM केवल एक नंबर रिकॉर्ड करती है — आपका नाम या चेहरा नहीं। यह 100% गुमनाम है।",
        trustHighlight: "आपका वोट 100% गुमनाम है — हमेशा।",
        trustHelp: "धमकी महसूस हो रही है? 1950 पर कॉल करें",

        epicTitle: "🪪 आपका EPIC नंबर क्या है?",
        epicDesc: "EPIC = मतदाता फोटो पहचान पत्र — आपके वोटर आईडी पर अद्वितीय पहचान।",
        epicBtn: "voters.eci.gov.in पर अपना जांचें &rarr;"
    },
    bn: {
        title: "আপনার কণ্ঠ। আপনার ভোট। আপনার VoxPop।",
        subtitle: "প্রত্যেক প্রথমবার ভোটদাতার বন্ধুত্বপূর্ণ নির্দেশক।",
        secondary: "কোনো ভোটার যেন বাদ না পড়েন — No voter should be left behind.",
        cta: "আমার যাত্রা শুরু করুন →",
        card1Title: "প্রক্রিয়া জানুন",
        card1Desc: "নিবন্ধন থেকে ফলাফল পর্যন্ত ধাপে ধাপে।",
        card2Title: "VoxPop কে জিজ্ঞাসা করুন",
        card2Desc: "আপনার নিজস্ব ভাষা এবং শৈলীতে এআই উত্তর পান।",
        card3Title: "পরবর্তী ভোট জানুন",
        card3Desc: "আপনি পরবর্তীতে কবে ভোট দিতে পারবেন তা জানুন।",
        learnTitle: "নির্বাচন সম্পর্কে জানুন",
        learnSubtitle: "গণতন্ত্রের জন্য আপনার ধাপে ধাপে নির্দেশিকা।",
        step1Title: "<span aria-hidden=\"true\">🏛️</span> নির্বাচন কী?",
        step1Desc: "গণতন্ত্র কীভাবে কাজ করে, আপনার ভোট কেন গুরুত্বপূর্ণ।",
        step2Title: "<span aria-hidden=\"true\">✅</span> কারা ভোট দিতে পারে?",
        step2Desc: "বয়স ১৮+, ভারতীয় নাগরিক, নিবন্ধিত ভোটার।",
        step3Title: "<span aria-hidden=\"true\">📝</span> কীভাবে নিবন্ধন করবেন?",
        step3Desc: "ভোটার আইডি, ফর্ম 6, voters.eci.gov.in এ অনলাইন।",
        step4Title: "<span aria-hidden=\"true\">🗓️</span> নির্বাচনের পর্যায় এবং সময়সীমা",
        step4Desc: "ভারত কীভাবে পর্যায়ক্রমে নির্বাচন পরিচালনা করে।",
        step5Title: "<span aria-hidden=\"true\">🏫</span> ভোটের দিনের প্রক্রিয়া",
        step5Desc: "বুথে পৌঁছানো থেকে ভোট দেওয়া পর্যন্ত।",
        step6Title: "<span aria-hidden=\"true\">🖥️</span> কীভাবে ভোট গণনা করা হয়",
        step6Desc: "EVM ট্যালি, VVPAT ক্রস-চেক, ফলাফল।",
        step7Title: "<span aria-hidden=\"true\">🏆</span> ফলাফল এবং এরপর কী ঘটে",
        step7Desc: "বিজয়ীর ঘোষণা, সরকার গঠন।",
        tellMeMore: "আমাকে আরও বলুন &rarr;",

        // Voting Day Guide
        vdTitle: "ভোটের দিনের অভিজ্ঞতা",
        vdGuideTitle: "বুথ গাইড (ধাপে ধাপে)",
        bg1Title: "<span aria-hidden=\"true\">🧾</span> আপনার নাম এবং বুথ যাচাই করুন",
        bg1Desc: "voters.eci.gov.in বা 1950 এ কল করুন।",
        bg2Title: "<span aria-hidden=\"true\">🧍</span> লাইনে দাঁড়ান",
        bg2Desc: "প্রবীণ এবং ভিন্নভাবে সক্ষম ভোটারদের জন্য আলাদা লাইন।",
        bg3Title: "<span aria-hidden=\"true\">✅</span> পরিচয় যাচাই",
        bg3Desc: "পোলিং অফিসার আপনার নাম এবং আইডি যাচাই করবেন।",
        bg4Title: "<span aria-hidden=\"true\">☝️</span> কালি + টিকিট + স্বাক্ষর",
        bg4Desc: "বাম হাতের আঙুলে কালি, টিকিট গ্রহণ, স্বাক্ষর করুন।",
        bg5Title: "<span aria-hidden=\"true\">🚪</span> ভোটিং কম্পার্টমেন্টে প্রবেশ",
        bg5Desc: "টিকিট দিন, আপনি একা প্রবেশ করবেন।",
        bg6Title: "<span aria-hidden=\"true\">🔵</span> নীল বোতাম টিপুন",
        bg6Desc: "আপনার প্রার্থীর পাশের নীল বোতামটি টিপুন।",
        bg7Title: "<span aria-hidden=\"true\">🔴</span> লাল আলো + বীপ",
        bg7Desc: "লাল আলো এবং বীপ আপনার ভোট নিশ্চিত করবে।",
        bg8Title: "<span aria-hidden=\"true\">🧾</span> VVPAT এ যাচাই করুন",
        bg8Desc: "স্লিপটি ৭ সেকেন্ডের জন্য দৃশ্যমান হবে।",
        bgNotaNote: "দ্রষ্টব্য: NOTA সর্বদা EVM-এ শেষ বিকল্প।",

        evmTitle: "নিজে চেষ্টা করুন — এভাবেই কাজ করে 🗳️",
        evmSubtitle: "আসল EVM এ, লাল আলো এবং বীপ আপনার ভোট নিশ্চিত করে",

        queueTitle: "অপেক্ষার সময় অনুমান ⏱️",
        labelVoters: "আপনার বুথে কত ভোটার আছেন?",
        labelTime: "আপনি কোন সময়ে যাওয়ার পরিকল্পনা করছেন?",
        calcQueueBtn: "অপেক্ষার সময় গণনা করুন",

        trustTitle: "আমার ভোট কে পাবে তা কি কেউ জানবে?",
        trustDesc: "EVM শুধুমাত্র একটি নম্বর রেকর্ড করে — আপনার নাম বা মুখ নয়।",
        trustHighlight: "আপনার ভোট 100% বেনামী — সর্বদা।",
        trustHelp: "হুমকির সম্মুখীন? 1950 এ কল করুন",

        epicTitle: "🪪 আপনার EPIC নম্বর কী?",
        epicDesc: "EPIC = ভোটার আইডিতে আপনার অনন্য পরিচয়।",
        epicBtn: "voters.eci.gov.in এ আপনার যাচাই করুন &rarr;"
    }
};

/**
 * @description Simple frontend logger
 */
const logger = {
    info: (...args) => console.log('[VoxPop INFO]', ...args),
    error: (...args) => console.error('[VoxPop ERROR]', ...args)
};

document.addEventListener('DOMContentLoaded', () => {
    logger.info('VoxPop Initialized');

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks?.classList.toggle('active');
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', (!isExpanded).toString());
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navLinks?.classList.remove('active');
            hamburger?.setAttribute('aria-expanded', 'false');
        });
    });

    // Language Selection Logic
    const languageSelect = document.getElementById('language-select');

    // Load saved language
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    if (languageSelect) {
        languageSelect.value = savedLanguage;
        updateLanguage(savedLanguage);

        languageSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            localStorage.setItem('selectedLanguage', lang);
            updateLanguage(lang);
        });
    }

    // Country selection logic to toggle election type dropdown
    const countrySelect = document.getElementById('country-select');
    const electionGroup = document.getElementById('election-type-group');

    if (countrySelect) {
        countrySelect.addEventListener('change', (e) => {
            if (e.target.value === 'in') {
                if (electionGroup) electionGroup.style.display = 'flex';
            } else {
                if (electionGroup) electionGroup.style.display = 'none';
            }
        });
    }

    // "Start My Journey" Button Smooth Scroll
    document.querySelector('.cta-btn')?.addEventListener('click', () => {
        document.getElementById('learn')?.scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Timeline Intersection Observer
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15 // Trigger when 15% of the item is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const dot = entry.target.querySelector('.timeline-dot');
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('slide-in-left');

                // Remove 'current' from all dots
                document.querySelectorAll('.timeline-dot').forEach(d => d.classList.remove('current'));

                // Add 'current' to this dot
                if (dot) dot.classList.add('current');

                // Mark previous dots as completed
                let foundCurrent = false;
                document.querySelectorAll('.timeline-dot').forEach(d => {
                    if (d === dot) {
                        foundCurrent = true;
                        d.classList.remove('completed');
                    } else if (!foundCurrent) {
                        d.classList.add('completed');
                        d.classList.remove('current');
                    } else {
                        d.classList.remove('completed');
                        d.classList.remove('current');
                    }
                });

            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        // Initially set opacity to 0 via JS so they can animate in
        // but remain visible if JS fails (since CSS opacity is now 1)
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        observer.observe(item);
    });

    // "Tell me more" button logic
    const stepBtns = document.querySelectorAll('.step-btn');
    stepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const topic = btn.getAttribute('data-topic');
            logger.info("Navigating to Ask VoxPop with topic:", topic);

            // Scroll to chat section
            document.getElementById('ask')?.scrollIntoView({
                behavior: 'smooth'
            });

            // Pre-fill chat input
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.value = "Tell me more about: " + topic;
                // Trigger input event to update char counter and resize
                chatInput.dispatchEvent(new Event('input'));
                chatInput.focus();
            }
        });
    });
});

/**
 * @description Updates the entire page UI based on the selected language
 * @param {string} lang - language code (en, hi, bn)
 */
function updateLanguage(lang) {
    const t = translations[lang] || translations['en'];

    const elements = {
        'hero-title': t.title,
        'hero-subtitle': t.subtitle,
        'hero-secondary': t.secondary,
        'card-1-title': t.card1Title,
        'card-1-desc': t.card1Desc,
        'card-2-title': t.card2Title,
        'card-2-desc': t.card2Desc,
        'card-3-title': t.card3Title,
        'card-3-desc': t.card3Desc,
        'learn-title': t.learnTitle,
        'learn-subtitle': t.learnSubtitle,
        'step-1-title': t.step1Title,
        'step-1-desc': t.step1Desc,
        'step-2-title': t.step2Title,
        'step-2-desc': t.step2Desc,
        'step-3-title': t.step3Title,
        'step-3-desc': t.step3Desc,
        'step-4-title': t.step4Title,
        'step-4-desc': t.step4Desc,
        'step-5-title': t.step5Title,
        'step-5-desc': t.step5Desc,
        'step-6-title': t.step6Title,
        'step-6-desc': t.step6Desc,
        'step-7-title': t.step7Title,
        'step-7-desc': t.step7Desc,
        'vd-title': t.vdTitle,
        'vd-guide-title': t.vdGuideTitle,
        'bg-1-title': t.bg1Title,
        'bg-1-desc': t.bg1Desc,
        'bg-2-title': t.bg2Title,
        'bg-2-desc': t.bg2Desc,
        'bg-3-title': t.bg3Title,
        'bg-3-desc': t.bg3Desc,
        'bg-4-title': t.bg4Title,
        'bg-4-desc': t.bg4Desc,
        'bg-5-title': t.bg5Title,
        'bg-5-desc': t.bg5Desc,
        'bg-6-title': t.bg6Title,
        'bg-6-desc': t.bg6Desc,
        'bg-7-title': t.bg7Title,
        'bg-7-desc': t.bg7Desc,
        'bg-8-title': t.bg8Title,
        'bg-8-desc': t.bg8Desc,
        'bg-nota-note': t.bgNotaNote,
        'evm-title': t.evmTitle,
        'evm-subtitle': t.evmSubtitle,
        'queue-title': t.queueTitle,
        'label-voters': t.labelVoters,
        'label-time': t.labelTime,
        'calc-queue-btn': t.calcQueueBtn,
        'trust-title': t.trustTitle,
        'trust-desc': t.trustDesc,
        'trust-highlight': t.trustHighlight,
        'trust-help': t.trustHelp,
        'epic-title': t.epicTitle,
        'epic-desc': t.epicDesc,
        'epic-btn': t.epicBtn
    };

    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = text; // innerHTML used to render the spans/emojis
    }

    const cta = document.querySelector('.cta-btn');
    if (cta) cta.textContent = t.cta;

    for (let i = 1; i <= 7; i++) {
        const btn = document.getElementById(`step-${i}-btn`);
        if (btn) btn.innerHTML = t.tellMeMore;
    }
}
