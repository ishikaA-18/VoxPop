const app = require('./server/index.js');
const http = require('http');

const PORT = 8081; // Use a different port for testing just in case
const server = http.createServer(app);

server.listen(PORT, async () => {
    console.log(`Test server running on port ${PORT}`);

    try {
        const delay = (ms) => new Promise(res => setTimeout(res, ms));

        console.log('\n--- Testing /api/chat ---');
        const chatRes = await fetch(`http://localhost:${PORT}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: 'Hello, what is your name?',
                country: 'India',
                electionType: 'General Election',
                personalityMode: 'simple mode',
                selectedLanguage: 'English'
            })
        });
        const chatData = await chatRes.json();
        console.log('Chat Status:', chatRes.status);
        console.log('Chat Response:', chatData);

        await delay(3000);

        console.log('\n--- Testing /api/quiz ---');
        const quizRes = await fetch(`http://localhost:${PORT}/api/quiz`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                country: 'India',
                electionType: 'General Election',
                difficulty: 'Easy',
                selectedLanguage: 'English'
            })
        });
        const quizData = await quizRes.json();
        console.log('Quiz Status:', quizRes.status);
        console.log('Quiz Response:', JSON.stringify(quizData, null, 2).substring(0, 500) + '...');

        await delay(3000);

        console.log('\n--- Testing /api/predict (Known) ---');
        const predictRes1 = await fetch(`http://localhost:${PORT}/api/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                country: 'India',
                electionType: 'General Election',
                voterCardDate: '2005-01-01'
            })
        });
        const predictData1 = await predictRes1.json();
        console.log('Predict 1 Status:', predictRes1.status);
        console.log('Predict 1 Response:', predictData1);

        await delay(3000);

        console.log('\n--- Testing /api/predict (Unknown/Gemini) ---');
        const predictRes2 = await fetch(`http://localhost:${PORT}/api/predict`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                country: 'France',
                electionType: 'Presidential Election'
            })
        });
        const predictData2 = await predictRes2.json();
        console.log('Predict 2 Status:', predictRes2.status);
        console.log('Predict 2 Response:', predictData2);

    } catch (err) {
        console.error('Test script error:', err);
    } finally {
        server.close(() => {
            console.log('\nTest server closed.');
            process.exit(0);
        });
    }
});
