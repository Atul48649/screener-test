import request from 'supertest';
import app from '../app';

describe('Deployment APIs', () => {
    it('should create deployment successfully', async () => {
        const response = await request(app)
            .post('/api/v1/deployments')
            .send({
                model: 'model-a'
            });

        console.log("Response----------->", response.status, response.body);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty(
            'deployment_id'
        );
        expect(response.body.status).toBe(
            'provisioning'
        );
    });

    it('should get deployment details', async () => {
        const createResponse = await request(app)
            .post('/api/v1/deployments')
            .send({
                model: 'model-a'
            });

        const deploymentId = createResponse.body.deployment_id;

        const response = await request(app)
            .get(`/api/v1/deployments/${deploymentId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty(
            'id'
        );
        expect(response.body.id).toBe(
            deploymentId
        );
    });
});