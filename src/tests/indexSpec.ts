/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */

import supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import path from 'path';
import File from './../file';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Responses from endpoints', (): void => {
	describe('endpoint: /', (): void => {
		it('gets /', async (): Promise<void> => {
			const response: supertest.Response = await request.get('/');

			expect(response.status).toBe(200);
		});
	});

	describe('endpoint: /api/images', (): void => {
		it('/api/images?Image=HookKeeper (Or Any Valid ImgName)', async (): Promise<void> => {
			const response: supertest.Response = await request.get(
				'/api/images?Image=HookKeeper',
			);

			expect(response.status).toBe(200);
		});

		it('/api/images?Image=HookKeeper&W=200&H=200 (Valid Entries)', async (): Promise<void> => {
			const response: supertest.Response = await request.get(
				'/api/images?Image=HookKeeper&W=200&H=200',
			);

			expect(response.status).toBe(200);
		});

		it('/api/images?Image=HookKeeper&W=-200&H=200 (invalid Width Value)', async (): Promise<void> => {
			const response: supertest.Response = await request.get(
				'/api/images?Image=HookKeeper&W=-200&H=200',
			);

			expect(response.status).toBe(200);
		});

		it('/api/images (Enter Entries)', async (): Promise<void> => {
			const response: supertest.Response = await request.get('/api/images');

			expect(response.status).toBe(200);
		});
	});

	describe('endpoint: /Lalaland', (): void => {
		it('404 - Invalid Endpoint', async (): Promise<void> => {
			const response: supertest.Response = await request.get('/Lalaland');

			expect(response.status).toBe(404);
		});
	});
});

afterAll(async (): Promise<void> => {
	const resizedImagePath: string = path.resolve(
		File.imagesThumbPath,
		'HookKeeper.jpg',
	);

	try {
		await fs.access(resizedImagePath);
		fs.unlink(resizedImagePath);
	} catch {}
});
