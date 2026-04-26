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
        step1Title: "🏛️ What is an election?",
        step1Desc: "How democracy works, why your vote matters.",
        step2Title: "✅ Who can vote?",
        step2Desc: "Age 18+, Indian citizen, registered voter.",
        step3Title: "📝 How to register?",
        step3Desc: "Voter ID, Form 6, online at voters.eci.gov.in.",
        step4Title: "🗓️ Election phases & timelines",
        step4Desc: "How India conducts phased elections.",
        step5Title: "🏫 Voting day process",
        step5Desc: "From arriving at booth to casting vote.",
        step6Title: "🖥️ How votes are counted",
        step6Desc: "EVM tallying, VVPAT cross-check, results.",
        step7Title: "🏆 Results & what happens next",
        step7Desc: "Winner announcement, government formation.",
        tellMeMore: "Tell me more &rarr;",

        // Chat
        askHeading: "Ask VoxPop 🎙️",
        askSub: "Ask anything about elections. No judgment, no jargon.",
        modeSimple: "😊 Simple",
        modeGenZ: "⚡ Gen Z",
        modeClassic: "📖 Classic",
        modeSimpleDesc: "Keep It Easy",
        modeGenZDesc: "Short & Spicy",
        modeClassicDesc: "Deep Dive",
        prompt1: "When will voting be over so I can go home? 😅",
        prompt2: "Will anyone know which party I voted for?",
        prompt3: "How are votes counted by just pressing buttons?",
        prompt4: "What do I bring to the polling booth?",
        prompt5: "What happens if my name isn't on the voter list?",
        chatWelcome: "Hi! I'm VoxPop 👋 I'm here to answer all your election questions — no matter how basic they seem. What would you like to know?",
        chatPlaceholder: "Ask VoxPop anything about voting...",

        // Quiz
        myHeading: "My VoxPop 🏆",
        mySub: "Test your knowledge and earn your Civic Badge.",
        quizIntroTitle: "Are you an Election Expert? 🗳️",
        quizIntroDesc: "Take a quick 5-question quiz based on your selected country and election type.",
        quizComplete: "Quiz Complete! 🎉",
        downloadBadge: "Download Badge 📥",

        // Results
        expert: "Election Expert 🏆",
        champion: "Civic Champion 🎖️",
        voter: "Future Voter 🌱",

        // Voting Day Guide
        vdTitle: "Voting Day Experience",
        vdGuideTitle: "Step by Step Booth Guide",
        bg1Title: "🧾 Check your name & booth",
        bg1Desc: "Confirm name on Electoral Roll at voters.eci.gov.in or call 1950. Use Voter Helpline App Booth Navigator for GPS directions.",
        bg2Title: "🧍 Stand in queue orderly",
        bg2Desc: "Separate queues exist for senior citizens and differently-abled voters.",
        bg3Title: "✅ Identity verification",
        bg3Desc: "Polling Officer checks your name in voter list + verifies ID.",
        bg4Title: "☝️ Ink mark + ticket + signature",
        bg4Desc: "Indelible ink on LEFT hand finger, receive ticket, give signature.",
        bg5Title: "🚪 Enter voting compartment",
        bg5Desc: "Hand over ticket, Presiding Officer activates Ballot Unit, you enter alone — completely private.",
        bg6Title: "🔵 Press the BLUE button",
        bg6Desc: "Press the blue button next to your chosen candidate's name and symbol.",
        bg7Title: "🔴 RED light + BEEP",
        bg7Desc: "A red light glows and a beep sounds confirming your vote. If NO light or beep → immediately inform the Presiding Officer.",
        bg8Title: "🧾 Verify on VVPAT",
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
        step1Title: "🏛️ चुनाव क्या है?",
        step1Desc: "लोकतंत्र कैसे काम करता है, आपका वोट क्यों मायने रखता है।",
        step2Title: "✅ कौन वोट दे सकता है?",
        step2Desc: "उम्र 18+, भारतीय नागरिक, पंजीकृत मतदाता।",
        step3Title: "📝 पंजीकरण कैसे करें?",
        step3Desc: "वोटर आईडी, फॉर्म 6, voters.eci.gov.in पर ऑनलाइन।",
        step4Title: "🗓️ चुनाव चरण और समय-सीमा",
        step4Desc: "भारत कैसे चरणबद्ध चुनाव आयोजित करता है।",
        step5Title: "🏫 मतदान के दिन की प्रक्रिया",
        step5Desc: "बूथ पर पहुंचने से लेकर वोट डालने तक।",
        step6Title: "🖥️ वोटों की गिनती कैसे होती है",
        step6Desc: "EVM टैली, VVPAT क्रॉस-चेक, परिणाम।",
        step7Title: "🏆 परिणाम और आगे क्या होता है",
        step7Desc: "विजेता की घोषणा, सरकार का गठन।",
        tellMeMore: "मुझे और बताएं &rarr;",

        // Chat
        askHeading: "VoxPop से पूछें 🎙️",
        askSub: "चुनाव के बारे में कुछ भी पूछें। कोई निर्णय नहीं, कोई शब्दजाल नहीं।",
        modeSimple: "😊 सरल",
        modeGenZ: "⚡ जेन जेड",
        modeClassic: "📖 क्लासिक",
        modeSimpleDesc: "इसे आसान रखें",
        modeGenZDesc: "छोटा और मजेदार",
        modeClassicDesc: "गहराई से जानें",
        prompt1: "वोटिंग कब खत्म होगी ताकि मैं घर जा सकूं? 😅",
        prompt2: "क्या किसी को पता चलेगा कि मैंने किस पार्टी को वोट दिया?",
        prompt3: "सिर्फ बटन दबाने से वोटों की गिनती कैसे होती है?",
        prompt4: "मैं मतदान केंद्र पर क्या लेकर जाऊं?",
        prompt5: "अगर मेरा नाम मतदाता सूची में नहीं है तो क्या होगा?",
        chatWelcome: "नमस्ते! मैं VoxPop हूँ 👋 मैं यहाँ आपके सभी चुनावी सवालों के जवाब देने के लिए हूँ। आप क्या जानना चाहेंगे?",
        chatPlaceholder: "वोटिंग के बारे में VoxPop से कुछ भी पूछें...",

        // Quiz
        myHeading: "मेरा VoxPop 🏆",
        mySub: "अपने ज्ञान का परीक्षण करें और अपना नागरिक बैज अर्जित करें।",
        quizIntroTitle: "क्या आप चुनाव विशेषज्ञ हैं? 🗳️",
        quizIntroDesc: "अपने चयनित देश और चुनाव प्रकार के आधार पर 5 सवालों की प्रश्नोत्तरी लें।",
        quizComplete: "प्रश्नोत्तरी पूरी हुई! 🎉",
        downloadBadge: "बैज डाउनलोड करें 📥",

        // Results
        expert: "चुनाव विशेषज्ञ 🏆",
        champion: "नागरिक चैंपियन 🎖️",
        voter: "भावी मतदाता 🌱",

        // Voting Day Guide
        vdTitle: "मतदान दिवस का अनुभव",
        vdGuideTitle: "बूथ गाइड (चरण-दर-चरण)",
        bg1Title: "🧾 अपना नाम और बूथ जांचें",
        bg1Desc: "voters.eci.gov.in या 1950 पर कॉल करें। GPS के लिए वोटर हेल्पलाइन ऐप का उपयोग करें।",
        bg2Title: "🧍 कतार में खड़े हों",
        bg2Desc: "वरिष्ठ नागरिकों और दिव्यांगों के लिए अलग कतारें।",
        bg3Title: "✅ पहचान सत्यापन",
        bg3Desc: "मतदान अधिकारी आपका नाम और आईडी सत्यापित करेगा।",
        bg4Title: "☝️ स्याही + पर्ची + हस्ताक्षर",
        bg4Desc: "बाएं हाथ की उंगली पर स्याही, पर्ची प्राप्त करें, हस्ताक्षर करें।",
        bg5Title: "🚪 वोटिंग कंपार्टमेंट में प्रवेश करें",
        bg5Desc: "पर्ची दें, अधिकारी मशीन चालू करेगा, आप अकेले प्रवेश करेंगे।",
        bg6Title: "🔵 नीला बटन दबाएं",
        bg6Desc: "अपने उम्मीदवार के सामने नीला बटन दबाएं।",
        bg7Title: "🔴 लाल बत्ती + बीप",
        bg7Desc: "लाल बत्ती जलेगी और बीप की आवाज आपके वोट की पुष्टि करेगी।",
        bg8Title: "🧾 VVPAT पर जांचें",
        bg8Desc: "पर्ची 7 सेकंड तक दिखाई देगी। फिर वह सीलबंद बॉक्स में गिर जाएगी।",
        bgNotaNote: "नोट: NOTA (इनमें से कोई नहीं) हमेशा EVM पर अंतिम विकल्प होता है।",

        evmTitle: "इसे खुद आजमाएं — बूथ पर बिल्कुल ऐसा ही होता है 🗳️",
        evmSubtitle: "असली EVM में, लाल बत्ती और बीप आपके वोट की पुष्टि करती है",

        queueTitle: "कतार समय अनुमानक ⏱️",
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
        step1Title: "🏛️ নির্বাচন কী?",
        step1Desc: "গণতন্ত্র কীভাবে কাজ করে, আপনার ভোট কেন গুরুত্বপূর্ণ।",
        step2Title: "✅ কারা ভোট দিতে পারে?",
        step2Desc: "বয়স ১৮+, ভারতীয় নাগরিক, নিবন্ধিত ভোটার।",
        step3Title: "📝 কীভাবে নিবন্ধন করবেন?",
        step3Desc: "ভোটার আইডি, ফর্ম 6, voters.eci.gov.in এ অনলাইন।",
        step4Title: "🗓️ নির্বাচনের পর্যায় এবং সময়সীমা",
        step4Desc: "ভারত কীভাবে পর্যায়ক্রমে নির্বাচন পরিচালনা করে।",
        step5Title: "🏫 ভোটের দিনের প্রক্রিয়া",
        step5Desc: "বুথে পৌঁছানো থেকে ভোট দেওয়া পর্যন্ত।",
        step6Title: "🖥️ কীভাবে ভোট গণনা করা হয়",
        step6Desc: "EVM ট্যালি, VVPAT ক্রস-চেক, ফলাফল।",
        step7Title: "🏆 ফলাফল এবং এরপর কী ঘটে",
        step7Desc: "বিজয়ীর ঘোষণা, সরকার গঠন।",
        tellMeMore: "আমাকে আরও বলুন &rarr;",

        // Chat
        askHeading: "VoxPop কে জিজ্ঞাসা করুন 🎙️",
        askSub: "নির্বাচন সম্পর্কে যেকোনো কিছু জিজ্ঞাসা করুন।",
        modeSimple: "😊 সহজ",
        modeGenZ: "⚡ জেন জি",
        modeClassic: "📖 ক্লাসিক",
        modeSimpleDesc: "সহজ রাখুন",
        modeGenZDesc: "ছোট ও মজাদার",
        modeClassicDesc: "বিস্তারিত জানুন",
        prompt1: "ভোট কখন শেষ হবে যাতে আমি বাড়ি যেতে পারি? 😅",
        prompt2: "আমি কোন দলকে ভোট দিয়েছি তা কি কেউ জানবে?",
        prompt3: "শুধু বোতাম টিপে কীভাবে ভোট গণনা করা হয়?",
        prompt4: "ভোটকেন্দ্রে আমি কী নিয়ে যাব?",
        prompt5: "ভোটার তালিকায় আমার নাম না থাকলে কী হবে?",
        chatWelcome: "হ্যালো! আমি VoxPop 👋 আমি আপনার সমস্ত নির্বাচনী প্রশ্নের উত্তর দিতে এখানে আছি। আপনি কী জানতে চান?",
        chatPlaceholder: "ভোট সম্পর্কে VoxPop কে কিছু জিজ্ঞাসা করুন...",

        // Quiz
        myHeading: "আমার VoxPop 🏆",
        mySub: "আপনার জ্ঞান পরীক্ষা করুন এবং আপনার নাগরিক ব্যাজ অর্জন করুন।",
        quizIntroTitle: "আপনি কি একজন নির্বাচন বিশেষজ্ঞ? 🗳️",
        quizIntroDesc: "আপনার নির্বাচিত দেশ এবং নির্বাচনের ধরণের উপর ভিত্তি করে একটি কুইজ নিন।",
        quizComplete: "কুইজ সম্পন্ন! 🎉",
        downloadBadge: "ব্যাজ ডাউনলোড করুন 📥",

        // Results
        expert: "নির্বাচন বিশেষজ্ঞ 🏆",
        champion: "নাগরিক চ্যাম্পিয়ন 🎖️",
        voter: "ভবিষ্যৎ ভোটার 🌱",

        // Voting Day Guide
        vdTitle: "ভোটের দিনের অভিজ্ঞতা",
        vdGuideTitle: "বুথ গাইড (ধাপে ধাপে)",
        bg1Title: "🧾 আপনার নাম এবং বুথ যাচাই করুন",
        bg1Desc: "voters.eci.gov.in বা 1950 এ কল করুন।",
        bg2Title: "🧍 লাইনে দাঁড়ান",
        bg2Desc: "প্রবীণ এবং ভিন্নভাবে সক্ষম ভোটারদের জন্য আলাদা লাইন।",
        bg3Title: "✅ পরিচয় যাচাই",
        bg3Desc: "পোলিং অফিসার আপনার নাম এবং আইডি যাচাই করবেন।",
        bg4Title: "☝️ কালি + টিকিট + স্বাক্ষর",
        bg4Desc: "বাম হাতের আঙুলে কালি, টিকিট গ্রহণ, স্বাক্ষর করুন।",
        bg5Title: "🚪 ভোটিং কম্পার্টমেন্টে প্রবেশ",
        bg5Desc: "টিকিট দিন, আপনি একা প্রবেশ করবেন।",
        bg6Title: "🔵 নীল বোতাম টিপুন",
        bg6Desc: "আপনার প্রার্থীর পাশের নীল বোতামটি টিপুন।",
        bg7Title: "🔴 লাল আলো + বীপ",
        bg7Desc: "লাল আলো এবং বীপ আপনার ভোট নিশ্চিত করবে।",
        bg8Title: "🧾 VVPAT এ যাচাই করুন",
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
    },
    ta: {
        title: "உங்கள் குரல். உங்கள் வாக்கு. உங்கள் VoxPop.",
        subtitle: "ஒவ்வொரு முதல் முறை வாக்காளரும் தகுதியான நட்பு வழிகாட்டி.",
        cta: "எனது பயணத்தைத் தொடங்குங்கள் →",
        card1Title: "செயல்முறையை அறியுங்கள்",
        card2Title: "VoxPop-விடம் கேளுங்கள்",
        card3Title: "உங்கள் அடுத்த வாக்கை அறியுங்கள்",
        askHeading: "VoxPop-விடம் கேளுங்கள் 🎙️",
        myHeading: "எனது VoxPop 🏆",
        quizComplete: "வினாடி வினா முடிந்தது! 🎉",
        downloadBadge: "பேட்ஜைப் பதிவிறக்கவும் 📥",
        expert: "தேர்தல் நிபுணர் 🏆",
        champion: "குடிமைச் சாம்பியன் 🎖️",
        modeSimple: "😊 எளிமையானது",
        modeGenZ: "⚡ ஜென் இசட்",
        modeClassic: "📖 கிளாசிக்",
        modeSimpleDesc: "எளிதாக வைத்திருங்கள்",
        modeGenZDesc: "குறுகிய மற்றும் சுவாரஸ்யமானது",
        modeClassicDesc: "ஆழமாக அறியுங்கள்",
        prompt1: "நான் வீட்டிற்குச் செல்ல வாக்குப்பதிவு எப்போது முடியும்? 😅",
        prompt2: "நான் எந்தக் கட்சிக்கு வாக்களித்தேன் என்று யாருக்காவது தெரியுமா?",
        prompt3: "பொத்தான்களை அழுத்துவதன் மூலம் வாக்குகள் எவ்வாறு எண்ணப்படுகின்றன?",
        prompt4: "வாக்குச்சாவடிக்கு நான் என்ன கொண்டு வர வேண்டும்?",
        prompt5: "வாக்காளர் பட்டியலில் எனது பெயர் இல்லையென்றால் என்ன நடக்கும்?",
        startJourney: "எனது பயணத்தைத் தொடங்குங்கள்",
        chatWelcome: "வணக்கம்! நான் VoxPop 👋 உங்கள் தேர்தல் கேள்விகளுக்குப் பதிலளிக்க நான் இங்கே இருக்கிறேன். நீங்கள் என்ன அறிய விரும்புகிறீர்கள்?",
        chatPlaceholder: "வாக்களிப்பது பற்றி எதையும் கேளுங்கள்...",
        learnTitle: "தேர்தல்கள் பற்றி அறியுங்கள்",
        vdTitle: "வாக்குப்பதிவு நாள் அனுபவம்"
    },
    te: {
        title: "మీ గొంతు. మీ ఓటు. మీ VoxPop.",
        subtitle: "ప్రతి మొదటిసారి ఓటరుకు స్నేహపూర్వక మార్గదర్శి.",
        cta: "నా ప్రయాణాన్ని ప్రారంభించండి →",
        card1Title: "ప్రక్రియను తెలుసుకోండి",
        card2Title: "VoxPop ని అడగండి",
        card3Title: "మీ తదుపరి ఓటును తెలుసుకోండి",
        askHeading: "VoxPop ని అడగండి 🎙️",
        myHeading: "నా VoxPop 🏆",
        quizComplete: "క్విజ్ పూర్తయింది! 🎉",
        downloadBadge: "బ్యాడ్జ్‌ని డౌన్‌లోడ్ చేయండి 📥",
        expert: "ఎన్నికల నిపుణుడు 🏆",
        champion: "సివిక్ ఛాంపియన్ 🎖️",
        modeSimple: "😊 సరళమైనది",
        modeGenZ: "⚡ జెన్ జెడ్",
        modeClassic: "📖 క్లాసిక్",
        modeSimpleDesc: "సులభంగా ఉంచండి",
        modeGenZDesc: "చిన్నగా మరియు సరదాగా",
        modeClassicDesc: "లోతుగా తెలుసుకోండి",
        prompt1: "నేను ఇంటికి వెళ్లడానికి ఓటింగ్ ఎప్పుడు ముగుస్తుంది? 😅",
        prompt2: "నేను ఏ పార్టీకి ఓటు వేశానో ఎవరికైనా తెలుస్తుందా?",
        prompt3: "బటన్లను నొక్కడం ద్వారా ఓట్లు ఎలా లెక్కిస్తారు?",
        prompt4: "నేను పోలింగ్ బూత్‌కు ఏమి తీసుకురావాలి?",
        prompt5: "ఓటరు జాబితాలో నా పేరు లేకపోతే ఏమవుతుంది?",
        startJourney: "నా ప్రయాణాన్ని ప్రారంభించండి",
        chatWelcome: "నమస్కారం! నేను VoxPop 👋 మీ ఎన్నికల ప్రశ్నలకు సమాధానం ఇవ్వడానికి నేను ఇక్కడ ఉన్నాను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
        chatPlaceholder: "ఓటింగ్ గురించి ఏదైనా అడగండి...",
        learnTitle: "ఎన్నికల గురించి తెలుసుకోండి",
        vdTitle: "ఓటింగ్ రోజు అనుభవం"
    },
    mr: {
        title: "तुमचा आवाज. तुमचे मत. तुमचे VoxPop.",
        subtitle: "प्रत्येक पहिल्या मतदारासाठी अनुकूल मार्गदर्शक.",
        cta: "माझा प्रवास सुरू करा →",
        card1Title: "प्रक्रिया जाणून घ्या",
        card2Title: "VoxPop ला विचारा",
        card3Title: "तुमचे पुढचे मत जाणून घ्या",
        askHeading: "VoxPop ला विचारा 🎙️",
        myHeading: "माझे VoxPop 🏆",
        quizComplete: "क्विझ पूर्ण! 🎉",
        downloadBadge: "बॅज डाउनलोड करा 📥",
        expert: "निवडणूक तज्ञ 🏆",
        champion: "नागरी चॅम्पियन 🎖️",
        modeSimple: "😊 सोपे",
        modeGenZ: "⚡ जेन झेड",
        modeClassic: "📖 क्लासिक",
        modeSimpleDesc: "सोपे ठेवा",
        modeGenZDesc: "थोडक्यात आणि मनोरंजक",
        modeClassicDesc: "सखोल जाणून घ्या",
        prompt1: "मतदान कधी संपेल जेणेकरून मी घरी जाऊ शकेन? 😅",
        prompt2: "मी कोणत्या पक्षाला मतदान केले हे कोणाला कळेल का?",
        prompt3: "बटणे दाबून मते कशी मोजली जातात?",
        prompt4: "मी मतदान केंद्रावर काय घेऊन जावे?",
        prompt5: "मतदार यादीत माझे नाव नसेल तर काय होईल?",
        startJourney: "माझा प्रवास सुरू करा",
        chatWelcome: "नमस्कार! मी VoxPop आहे 👋 मी तुमच्या निवडणुकीशी संबंधित प्रश्नांची उत्तरे देण्यासाठी येथे आहे. तुम्हाला काय जाणून घ्यायचे आहे?",
        chatPlaceholder: "मतदानाबद्दल काहीही विचारा...",
        learnTitle: "निवडणुकीबद्दल जाणून घ्या",
        vdTitle: "मतदानाचा दिवस अनुभव"
    },
    gu: {
        title: "તમારો અવાજ. તમારો મત. તમારો VoxPop.",
        subtitle: "દરેક પ્રથમ વખતના મતદાર માટે મૈત્રીપૂર્ણ માર્ગદર્શક.",
        cta: "મારી મુસાફરી શરૂ કરો →",
        card1Title: "પ્રક્રિયા જાણો",
        card2Title: "VoxPop ને પૂછો",
        card3Title: "તમારો આગામી મત જાણો",
        askHeading: "VoxPop ને પૂછો 🎙️",
        myHeading: "મારું VoxPop 🏆",
        quizComplete: "ક્વિઝ પૂર્ણ! 🎉",
        downloadBadge: "બેજ ડાઉનલોડ કરો 📥",
        expert: "ચૂંટણી નિષ્ણાત 🏆",
        champion: "નાગરિક ચેમ્પિયન 🎖️",
        modeSimple: "😊 સરળ",
        modeGenZ: "⚡ જેન ઝેડ",
        modeClassic: "📖 ક્લાસિક",
        modeSimpleDesc: "સરળ રાખો",
        modeGenZDesc: "ટૂંકું અને રસપ્રદ",
        modeClassicDesc: "ઊંડાણપૂર્વક જાણો",
        prompt1: "મતદાન ક્યારે પૂરું થશે જેથી હું ઘરે જઈ શકું? 😅",
        prompt2: "મેં કયા પક્ષને મત આપ્યો છે તે કોઈને ખબર પડશે?",
        prompt3: "બટનો દબાવવાથી મતોની ગણતરી કેવી રીતે થાય છે?",
        prompt4: "હું મતદાન મથક પર શું સાથે લાવું?",
        prompt5: "જો મારું નામ મતદાર યાદીમાં ન હોય તો શું થશે?",
        startJourney: "મારી મુસાફરી શરૂ કરો",
        chatWelcome: "નમસ્તે! હું VoxPop છું 👋 હું તમારા ચૂંટણી પ્રશ્નોના જવાબ આપવા અહીં છું. તમે શું જાણવા માંગો છો?",
        chatPlaceholder: "મતદાન વિશે કંઈપણ પૂછો...",
        learnTitle: "ચૂંટણી વિશે જાણો",
        vdTitle: "મતદાન દિવસનો અનુભવ"
    },
    kn: {
        title: "ನಿಮ್ಮ ಧ್ವನಿ. ನಿಮ್ಮ ಮತ. ನಿಮ್ಮ VoxPop.",
        subtitle: "ಪ್ರತಿ ಮೊದಲ ಬಾರಿ ಮತದಾರರಿಗೆ ಸ್ನೇಹಪರ ಮಾರ್ಗದರ್ಶಿ.",
        cta: "ನನ್ನ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ →",
        card1Title: "ಪ್ರಕ್ರಿಯೆಯನ್ನು ತಿಳಿಯಿರಿ",
        card2Title: "VoxPop ಅನ್ನು ಕೇಳಿ",
        card3Title: "ನಿಮ್ಮ ಮುಂದಿನ ಮತವನ್ನು ತಿಳಿಯಿರಿ",
        askHeading: "VoxPop ಅನ್ನು ಕೇಳಿ 🎙️",
        myHeading: "ನನ್ನ VoxPop 🏆",
        quizComplete: "ಕ್ವಿಜ್ ಪೂರ್ಣಗೊಂಡಿದೆ! 🎉",
        downloadBadge: "ಬ್ಯಾಡ್ಜ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ 📥",
        expert: "ಚುನಾವಣಾ ತಜ್ಞ 🏆",
        champion: "ನಾಗರಿಕ ಚಾಂಪಿಯನ್ 🎖️",
        modeSimple: "😊 ಸರಳ",
        modeGenZ: "⚡ ಜೆನ್ ಝೆಡ್",
        modeClassic: "📖 ಕ್ಲಾಸಿಕ್",
        modeSimpleDesc: "ಸುಲಭವಾಗಿ ಇರಿಸಿ",
        modeGenZDesc: "ಸಣ್ಣ ಮತ್ತು ಆಸಕ್ತಿದಾಯಕ",
        modeClassicDesc: "ಆಳವಾಗಿ ತಿಳಿಯಿರಿ",
        prompt1: "ಮತದಾನ ಯಾವಾಗ ಮುಗಿಯುತ್ತದೆ ಇದರಿಂದ ನಾನು ಮನೆಗೆ ಹೋಗಬಹುದು? 😅",
        prompt2: "ನಾನು ಯಾವ ಪಕ್ಷಕ್ಕೆ ಮತ ಹಾಕಿದ್ದೇನೆ ಎಂದು ಯಾರಿಗಾದರೂ ತಿಳಿಯುತ್ತದೆಯೇ?",
        prompt3: "ಬಟನ್ ಒತ್ತುವ ಮೂಲಕ ಮತಗಳನ್ನು ಹೇಗೆ ಎಣಿಸಲಾಗುತ್ತದೆ?",
        prompt4: "ಮತದಾನ ಕೇಂದ್ರಕ್ಕೆ ನಾನು ಏನು ತರಬೇಕು?",
        prompt5: "ಮತದಾರರ ಪಟ್ಟಿಯಲ್ಲಿ ನನ್ನ ಹೆಸರಿಲ್ಲದಿದ್ದರೆ ಏನಾಗುತ್ತದೆ?",
        startJourney: "ನನ್ನ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
        chatWelcome: "ನಮಸ್ಕಾರ! ನಾನು VoxPop 👋 ನಿಮ್ಮ ಚುನಾವಣಾ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಲು ನಾನು ಇಲ್ಲಿದ್ದೇನೆ. ನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?",
        chatPlaceholder: "ಮತದಾನದ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ...",
        learnTitle: "ಚುನಾವಣೆಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ",
        vdTitle: "ಮತದಾನದ ದಿನದ ಅನುಭವ"
    },
    ml: {
        title: "നിങ്ങളുടെ ശബ്ദം. നിങ്ങളുടെ വോട്ട്. നിങ്ങളുടെ VoxPop.",
        subtitle: "ഓരോ ആദ്യ വോട്ടർക്കും അർഹമായ സൗഹൃദ ഗൈഡ്.",
        cta: "എന്റെ യാത്ര ആരംഭിക്കുക →",
        card1Title: "പ്രക്രിയ മനസ്സിലാക്കുക",
        card2Title: "VoxPop-നോട് ചോദിക്കുക",
        card3Title: "നിങ്ങളുടെ അടുത്ത വോട്ട് അറിയുക",
        askHeading: "VoxPop-നോട് ചോദിക്കുക 🎙️",
        myHeading: "എന്റെ VoxPop 🏆",
        quizComplete: "ക്വിസ് പൂർത്തിയായി! 🎉",
        downloadBadge: "ബാഡ്ജ് ഡൗൺലോഡ് ചെയ്യുക 📥",
        expert: "തിരഞ്ഞെടുപ്പ് വിദഗ്ധൻ 🏆",
        champion: "സിവിക് ചാമ്പ്യൻ 🎖️",
        modeSimple: "😊 ലളിതം",
        modeGenZ: "⚡ ജെൻ സെഡ്",
        modeClassic: "📖 ക്ലാസിക്",
        modeSimpleDesc: "ലളിതമായി വയ്ക്കുക",
        modeGenZDesc: "ചുരുങ്ങിയതും രസകരവും",
        modeClassicDesc: "ആഴത്തിൽ അറിയുക",
        prompt1: "വോട്ടിംഗ് എപ്പോൾ അവസാനിക്കും, എനിക്ക് വീട്ടിൽ പോകാം? 😅",
        prompt2: "ഞാൻ ഏത് പാർട്ടിക്കാണ് വോട്ട് ചെയ്തതെന്ന് ആരെങ്കിലും അറിയുമോ?",
        prompt3: "ബട്ടണുകൾ അമർത്തി വോട്ടുകൾ എങ്ങനെ എണ്ണുന്നു?",
        prompt4: "പോളിംഗ് ബൂത്തിലേക്ക് ഞാൻ എന്താണ് കൊണ്ടുവരേണ്ടത്?",
        prompt5: "വോട്ടർ പട്ടികയിൽ എന്റെ പേരില്ലെങ്കിൽ എന്ത് സംഭവിക്കും?",
        startJourney: "എന്റെ യാത്ര ആരംഭിക്കുക",
        chatWelcome: "ഹലോ! ഞാൻ VoxPop 👋 നിങ്ങളുടെ തിരഞ്ഞെടുപ്പ് ചോദ്യങ്ങൾക്ക് മറുപടി നൽകാൻ ഞാൻ ഇവിടെയുണ്ട്. നിങ്ങൾക്ക് എന്താണ് അറിയേണ്ടത്?",
        chatPlaceholder: "വോട്ടിംഗിനെക്കുറിച്ച് എന്തും ചോദിക്കുക...",
        learnTitle: "തിരഞ്ഞെടുപ്പുകളെക്കുറിച്ച് അറിയുക",
        vdTitle: "വോട്ടിംഗ് ദിന അനുഭവം"
    },
    pa: {
        title: "ਤੁਹਾਡੀ ਆਵਾਜ਼। ਤੁਹਾਡੀ ਵੋਟ। ਤੁਹਾਡਾ VoxPop।",
        subtitle: "ਹਰ ਪਹਿਲੀ ਵਾਰ ਵੋਟਰ ਲਈ ਦੋਸਤਾਨਾ ਮਾਰਗਦਰਸ਼ਕ।",
        cta: "ਮੇਰੀ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ →",
        card1Title: "ਪ੍ਰਕਿਰਿਆ ਸਿੱਖੋ",
        card2Title: "VoxPop ਨੂੰ ਪੁੱਛੋ",
        card3Title: "ਆਪਣੀ ਅਗਲੀ ਵੋਟ ਜਾਣੋ",
        askHeading: "VoxPop ਨੂੰ ਪੁੱਛੋ 🎙️",
        myHeading: "ਮੇਰਾ VoxPop 🏆",
        quizComplete: "ਕੁਇਜ਼ ਪੂਰਾ ਹੋਇਆ! 🎉",
        downloadBadge: "ਬੈਜ ਡਾਊਨਲੋਡ ਕਰੋ 📥",
        expert: "ਚੋਣ ਮਾਹਰ 🏆",
        champion: "ਸਿਵਿਕ ਚੈਂਪੀਅਨ 🎖️",
        modeSimple: "😊 ਸਰਲ",
        modeGenZ: "⚡ ਜੇਨ ਜ਼ੈਡ",
        modeClassic: "📖 ਕਲਾਸਿਕ",
        modeSimpleDesc: "ਇਸਨੂੰ ਆਸਾਨ ਰੱਖੋ",
        modeGenZDesc: "ਛੋਟਾ ਅਤੇ ਦਿਲਚਸਪ",
        modeClassicDesc: "ਡੂੰਘਾਈ ਨਾਲ ਜਾਣੋ",
        prompt1: "ਵੋਟਿੰਗ ਕਦੋਂ ਖਤਮ ਹੋਵੇਗੀ ਤਾਂ ਜੋ ਮੈਂ ਘਰ ਜਾ ਸਕਾਂ? 😅",
        prompt2: "ਕੀ ਕਿਸੇ ਨੂੰ ਪਤਾ ਲੱਗੇਗਾ ਕਿ ਮੈਂ ਕਿਸ ਪਾਰਟੀ ਨੂੰ ਵੋਟ ਪਾਈ ਹੈ?",
        prompt3: "ਸਿਰਫ਼ ਬਟਨ ਦਬਾਉਣ ਨਾਲ ਵੋਟਾਂ ਦੀ ਗਿਣਤੀ ਕਿਵੇਂ ਹੁੰਦੀ ਹੈ?",
        prompt4: "ਮੈਂ ਪੋਲਿੰਗ ਬੂਥ 'ਤੇ ਕੀ ਲੈ ਕੇ ਜਾਵਾਂ?",
        prompt5: "ਜੇਕਰ ਵੋਟਰ ਸੂਚੀ ਵਿੱਚ ਮੇਰਾ ਨਾਮ ਨਹੀਂ ਹੈ ਤਾਂ ਕੀ ਹੋਵੇਗਾ?",
        startJourney: "ਮੇਰੀ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ",
        chatWelcome: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ VoxPop ਹਾਂ 👋 ਮੈਂ ਤੁਹਾਡੇ ਚੋਣ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦੇਣ ਲਈ ਇੱਥੇ ਹਾਂ। ਤੁਸੀਂ ਕੀ ਜਾਣਨਾ ਚਾਹੋਗੇ?",
        chatPlaceholder: "ਵੋਟਿੰਗ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...",
        learnTitle: "ਚੋਣਾਂ ਬਾਰੇ ਸਿੱਖੋ",
        vdTitle: "ਵੋਟਿੰਗ ਦਿਨ ਦਾ ਅਨੁਭਵ"
    },
    or: {
        title: "ଆପଣଙ୍କ ସ୍ୱର। ଆପଣଙ୍କ ଭୋଟ୍। ଆପଣଙ୍କ VoxPop।",
        subtitle: "ପ୍ରତ୍ୟେକ ପ୍ରଥମ ଭୋଟରଙ୍କ ପାଇଁ ଏକ ବନ୍ଧୁତ୍ୱପୂର୍ଣ୍ଣ ମାର୍ଗଦର୍ଶିକା।",
        cta: "ମୋର ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ →",
        card1Title: "ପ୍ରକ୍ରିୟା ଶିଖନ୍ତୁ",
        card2Title: "VoxPop କୁ ପଚାରନ୍ତୁ",
        card3Title: "ଆପଣଙ୍କ ପରବର୍ତ୍ତୀ ଭୋଟ୍ ଜାଣନ୍ତୁ",
        askHeading: "VoxPop କୁ ପଚାରନ୍ତୁ 🎙️",
        myHeading: "ମୋର VoxPop 🏆",
        quizComplete: "କୁଇଜ୍ ସମାପ୍ତ! 🎉",
        downloadBadge: "ବ୍ୟାଜ୍ ଡାଉନଲୋଡ୍ କରନ୍ତୁ 📥",
        expert: "ନିର୍ବାଚନ ବିଶେଷଜ୍ଞ 🏆",
        champion: "ନାଗରିକ ଚାମ୍ପିଅନ୍ 🎖️",
        modeSimple: "😊 ସରଳ",
        modeGenZ: "⚡ ଜେନ୍ ଜେଡ୍",
        modeClassic: "📖 କ୍ଲାସିକ",
        modeSimpleDesc: "ଏହାକୁ ସହଜ ରଖନ୍ତୁ",
        modeGenZDesc: "ଛୋଟ ଏବଂ ମଜାଦାର",
        modeClassicDesc: "ଗଭୀର ଭାବରେ ଜାଣନ୍ତୁ",
        prompt1: "ମୁଁ ଘରକୁ ଯିବା ପାଇଁ ଭୋଟ୍ କେବେ ଶେଷ ହେବ? 😅",
        prompt2: "ମୁଁ କେଉଁ ଦଳକୁ ଭୋଟ୍ ଦେଲି କେହି ଜାଣିବେ କି?",
        prompt3: "କେବଳ ବଟନ୍ ଦବାଇ ଭୋଟ୍ କିପରି ଗଣନା କରାଯାଏ?",
        prompt4: "ମୁଁ ପୋଲିଂ ବୁଥକୁ କ’ଣ ଆଣିବି?",
        prompt5: "ଯଦି ଭୋଟର ତାଲିକାରେ ମୋ ନାମ ନାହିଁ ତେବେ କ’ଣ ହେବ?",
        startJourney: "ମୋର ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ",
        chatWelcome: "ନମସ୍କାର! ମୁଁ VoxPop 👋 ମୁଁ ଆପଣଙ୍କର ନିର୍ବାଚନ ସମ୍ବନ୍ଧୀୟ ପ୍ରଶ୍ନର ଉତ୍ତର ଦେବାକୁ ଏଠାରେ ଅଛି। ଆପଣ କ’ଣ ଜାଣିବାକୁ ଚାହାଁନ୍ତି?",
        chatPlaceholder: "ଭୋଟ୍ ବିଷୟରେ କିଛି ବି ପଚାରନ୍ତୁ...",
        learnTitle: "ନିର୍ବାଚନ ବିଷୟରେ ଶିଖନ୍ତୁ",
        vdTitle: "ଭୋଟ୍ ଦିନର ଅଭିଜ୍ଞତା"
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
 * @param {string} lang - language code (en, hi, bn, etc.)
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
        'epic-btn': t.epicBtn,

        // Chat Module Elements (if exist)
        'chat-section-title': t.askHeading,
        'chat-section-sub': t.askSub,
        'mode-simple-label': t.modeSimple,
        'mode-genZ-label': t.modeGenZ,
        'mode-classic-label': t.modeClassic,
        'mode-simple-desc': t.modeSimpleDesc,
        'mode-genZ-desc': t.modeGenZDesc,
        'mode-classic-desc': t.modeClassicDesc,
        'prompt-chip-1': t.prompt1,
        'prompt-chip-2': t.prompt2,
        'prompt-chip-3': t.prompt3,
        'prompt-chip-4': t.prompt4,
        'prompt-chip-5': t.prompt5,
        'chat-welcome-text': t.chatWelcome,

        // Quiz Module Elements (if exist)
        'quiz-section-title': t.myHeading,
        'quiz-section-sub': t.mySub,
        'quiz-intro-title': t.quizIntroTitle,
        'quiz-intro-desc': t.quizIntroDesc,
        'quiz-complete-title': t.quizComplete,
        'download-badge-btn': t.downloadBadge
    };

    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) {
            if (text) el.innerHTML = text;
        }
    }

    const cta = document.querySelector('.cta-btn');
    if (cta && t.cta) cta.textContent = t.cta;

    const chatInput = document.getElementById('chatInput');
    if (chatInput && t.chatPlaceholder) chatInput.placeholder = t.chatPlaceholder;

    for (let i = 1; i <= 7; i++) {
        const btn = document.getElementById(`step-${i}-btn`);
        if (btn && t.tellMeMore) btn.innerHTML = t.tellMeMore;
    }

    // Notify modules
    if (window.chatModule && window.chatModule.updateLangBadge) {
        window.chatModule.updateLangBadge(lang);
    }
}

/**
 * @description Helper to get a translation string by key
 * @param {string} key - translation key
 * @param {string} [lang] - optional language code
 * @returns {string}
 */
function getTranslation(key, lang) {
    const l = lang || localStorage.getItem('selectedLanguage') || 'en';
    return translations[l]?.[key] || translations['en'][key] || key;
}

// Expose globally
window.voxpopUpdateLanguage = updateLanguage;
window.voxpopGetTranslation = getTranslation;
