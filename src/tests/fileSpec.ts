/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */
import { promises as fs } from 'fs';
import path from 'path';
import ImageFile from '../utilities/imagesfiles';

describe('Image Resizing via sharp', (): void => {
	it('Not A Valid Width Value.', async (): Promise<void> => {
		const error: null | string = await ImageFile.imageManpulation({
			Image: 'Lalaland',
			W: '-100',
			H: '500',
		});
		expect(error).not.toBeNull();
	});

	it('Not A Valid Image Name.', async (): Promise<void> => {
		const error: null | string = await ImageFile.imageManpulation({
			Image: 'Lalaland',
			W: '100',
			H: '500',
		});
		expect(error).not.toBeNull();
	});

	it('Resized Done, All Entries Are Valid.', async (): Promise<void> => {
		await ImageFile.imageManpulation({
			Image: 'HookKeeper',
			W: '200',
			H: '200',
		});

		const resizedImagePath: string = path.resolve(
			ImageFile.resizedImagesPath,
			`HookKeeper-200x200.jpg`,
		);
		let errorFile: null | string = '';

		try {
			await fs.access(resizedImagePath);
			errorFile = null;
		} catch {
			errorFile = "Image Wasn't Created Before.";
		}

		expect(errorFile).toBeNull();
	});
});

afterAll(async (): Promise<void> => {
	const resizedImagePath: string = path.resolve(
		ImageFile.resizedImagesPath,
		'HookKeeper-200x200.jpg',
	);
	try {
		await fs.access(resizedImagePath);
		fs.unlink(resizedImagePath);
	} catch {}
});
