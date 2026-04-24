const request = require('supertest');
const app = require('../server/index');

describe('API Endpoints', () => {
    it('should return a placeholder reply for chat', async () => {
        const res = await request(app).post('/api/chat').send({ message: 'Hello' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('reply');
    });
});
