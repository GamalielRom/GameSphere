import request from 'supertest';
import app from '../Routes/server'
import { describe } from 'node:test';

describe('Users Api', () =>{
    it('Should return all the users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('should create a new company', async () => {
        const newCompany = { company_name: 'SEGA' };
        const res = await request(app).post('/api/companies').send(newCompany);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'Company created successfully');
    });

    it('should return 404 for a non-existent company', async () => {
        const res = await request(app).get('/api/companies/99999'); // ID inexistente
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error');
    });
})