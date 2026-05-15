import request from 'supertest';
import app from '../app';

describe('Completion APIs', () => {
    it('should reject request without api key', async () => {
        const response = await request(app)
            .post('/api/v1/4e8b98da-20ad-49fe-8f54-1abeb84a9ae7/completions')
            .send({
                prompt: 'Hello AI'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Authorization header missing');
    });

    it('should reject invalid deployment', async () => {
        const response = await request(app)
            .post('/api/v1/4e8b98da-20ad-49fe-8f54-1abeb84a9ae9/completions')
            .set(
                'Authorization',
                'Bearer 8431ba9ab644755a2c41724c0856defd4f714a28417c1995'
            )
            .send({
                prompt: 'Hello AI'
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Deployment not found');
    });
});