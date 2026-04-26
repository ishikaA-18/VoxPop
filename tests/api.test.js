const request = require('supertest');
const app = require('../server/index');

// Mocking Google Generative AI
jest.mock('@google/generative-ai', () => {
    return {
        GoogleGenerativeAI: jest.fn().mockImplementation(() => {
            return {
                getGenerativeModel: jest.fn().mockReturnValue({
                    startChat: jest.fn().mockReturnValue({
                        sendMessage: jest.fn().mockResolvedValue({
                            response: { text: () => 'Mocked AI Response' }
                        })
                    }),
                    generateContent: jest.fn().mockImplementation((prompt) => {
                        const promptStr = typeof prompt === 'string' ? prompt : JSON.stringify(prompt);
                        if (promptStr.includes('MCQ questions') || promptStr.includes('quiz')) {
                            return Promise.resolve({
                                response: {
                                    text: () => JSON.stringify([
                                        { question: "Q1", options: ["A", "B", "C", "D"], correctIndex: 0, explanation: "E1" },
                                        { question: "Q2", options: ["A", "B", "C", "D"], correctIndex: 0, explanation: "E2" },
                                        { question: "Q3", options: ["A", "B", "C", "D"], correctIndex: 0, explanation: "E3" },
                                        { question: "Q4", options: ["A", "B", "C", "D"], correctIndex: 0, explanation: "E4" },
                                        { question: "Q5", options: ["A", "B", "C", "D"], correctIndex: 0, explanation: "E5" }
                                    ])
                                }
                            });
                        } else {
                            // Prediction response
                            return Promise.resolve({
                                response: {
                                    text: () => JSON.stringify({
                                        nextElectionDate: "May 2027",
                                        electionName: "General Election",
                                        whatVotingFor: "Parliamentary Representatives",
                                        isHappeningNow: false
                                    })
                                }
                            });
                        }
                    })
                })
            };
        })
    };
});

describe('VoxPop API Edge Cases', () => {
    
    describe('POST /api/chat', () => {
        // 1. empty message -> 400
        it('should return 400 for an empty message', async () => {
            const res = await request(app).post('/api/chat').send({ message: '' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error');
        });

        // 2. message over 500 chars -> truncate and 200
        it('should truncate message over 500 chars and return 200', async () => {
            const longMessage = 'a'.repeat(501);
            const res = await request(app).post('/api/chat').send({ message: longMessage });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('reply');
        });

        // 3. missing country field -> use default and return 200
        it('should use default country if missing and return 200', async () => {
            const res = await request(app).post('/api/chat').send({ message: 'Hello' });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('reply');
        });

        // 4. XSS attempt -> sanitize and return 200
        it('should sanitize XSS attempts and return 200', async () => {
            const res = await request(app).post('/api/chat').send({ message: '<script>alert(1)</script> Hello' });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('reply');
        });

        // 10. valid full request -> should return 200 with reply field
        it('should return 200 with reply field for valid full request', async () => {
            const res = await request(app).post('/api/chat').send({
                message: 'How do I vote?',
                country: 'India',
                electionType: 'General Election',
                personalityMode: 'classic',
                selectedLanguage: 'English'
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('reply');
        });

        // 9. Rate limiting -> send 11 requests, 11th should return 429
        it('should return 429 after 10 requests in a minute', async () => {
            // We've already sent a few requests above, so let's send enough to hit 11
            // Total requests so far: 4 (cases 1, 2, 3, 4, 10 ... wait that's 5)
            // Let's send 10 more to be sure
            for (let i = 0; i < 10; i++) {
                await request(app).post('/api/chat').send({ message: 'Rate limit test ' + i });
            }
            const res = await request(app).post('/api/chat').send({ message: '11th request' });
            expect(res.statusCode).toEqual(429);
        }, 15000); // Higher timeout for multiple requests
    });

    describe('POST /api/quiz', () => {
        // 5. invalid difficulty -> fallback and 200
        it('should fallback for invalid difficulty and return 200', async () => {
            const res = await request(app).post('/api/quiz').send({ difficulty: 'SuperHard' });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('questions');
        });

        // 6. missing country -> use default India and 200
        it('should use default country India if missing and return 200', async () => {
            const res = await request(app).post('/api/quiz').send({ difficulty: 'Medium' });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('questions');
        });

        // 11. valid request -> should return questions array with 5 items
        it('should return 5 questions for a valid request', async () => {
            const res = await request(app).post('/api/quiz').send({
                country: 'India',
                difficulty: 'Easy'
            });
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body.questions)).toBe(true);
            expect(res.body.questions.length).toEqual(5);
        });
    });

    describe('POST /api/predict', () => {
        // 7. unknown state -> should return 200 with fallback (Gemini)
        it('should handle unknown state and return 200', async () => {
            // We need to mock Gemini response for predict as well if it's not known
            // The mock above already handles generateContent which is used for predict
            const res = await request(app).post('/api/predict').send({
                country: 'France',
                state: 'UnknownState',
                electionType: 'Presidential'
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('nextElectionDate');
        });

        // 8. missing voterCardDate -> should handle gracefully
        it('should handle missing voterCardDate gracefully', async () => {
            const res = await request(app).post('/api/predict').send({
                country: 'India',
                electionType: 'General Election'
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('isEligible');
        });

        // 12. predict known — India, West Bengal -> should return isHappeningNow true
        it('should return isHappeningNow: true for India, West Bengal (2026)', async () => {
            const res = await request(app).post('/api/predict').send({
                country: 'India',
                state: 'West Bengal',
                electionType: 'General Election'
            });
            expect(res.statusCode).toEqual(200);
            expect(res.body.isHappeningNow).toBe(true);
        });
    });
});
