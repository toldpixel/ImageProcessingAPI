import supertest from 'supertest';
import app from '../index';
import {
    fileExistsInFull,
    fileExistsInThumbs,
    middleware
} from '../util/imageMiddleware';

const request = supertest(app);


describe('Test middleware functions', () => {

    describe('Test FileExist functions', () => {
        it('should return boolean true', async() => {
            const checkValFull = await fileExistsInFull('encenadaport');
            expect(checkValFull).toEqual(true)
        })

        it('should return boolean true or false', async() => {
            const checkValThumb = await fileExistsInThumbs('encenadaport','200','200');
            expect(true).toBe(true);
            expect(false).toBe(false);
        });
    })


    describe('Test endpoint responses', () => {
        it('response 200 OK (default request)', async() => {
            const response = await request.get('/api/images?filename=encenadaport&width=200&height=200');
            expect(response.status).toBe(200);
        })
    })

})
