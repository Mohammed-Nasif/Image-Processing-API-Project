/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */

import { promises as fs } from 'fs';
import path from 'path';
import resizeImage from './image-resizing';

// queries
interface ImageQuery {
	Image?: string;
	W?: string;
	H?: string;
}

export default class File {
	// Images Paths
	static imagesFullPath = path.resolve(__dirname, '../images');
	static imagesThumbPath = path.resolve(__dirname, '../images/resizedImages');

	// Get Image Path.
	static async getImagePath(params: ImageQuery): Promise<null | string> {
		if (!params.Image) {
			return null;
		}
		const filePath: string =
			params.W && params.H
				? path.resolve(
						File.imagesThumbPath,
						`${params.Image}-${params.W}x${params.H}.jpg`,
				  )
				: path.resolve(File.imagesFullPath, `${params.Image}.jpg`);
		try {
			await fs.access(filePath);
			return filePath;
		} catch {
			return null;
		}
	}

	// Chech Image Availablity
	static async isImageAvailable(Image: string = ''): Promise<boolean> {
		if (!Image) {
			return false; // Fail early
		}

		return (await File.getAvailableImageNames()).includes(Image);
	}
	//Return  available image names.
	static async getAvailableImageNames(): Promise<string[]> {
		try {
			return (await fs.readdir(File.imagesFullPath)).map(
				(Image: string): string => Image.split('.')[0],
			); // Cut extension
		} catch {
			return [];
		}
	}

	// Check if the resized img is already Available
	static async isThumbAvailable(params: ImageQuery): Promise<boolean> {
		if (!params.Image || !params.W || !params.H) {
			return false; // Fail early
		}

		// Set appropriate path
		const filePath: string = path.resolve(
			File.imagesThumbPath,
			`${params.Image}-${params.W}x${params.H}.jpg`,
		);

		try {
			await fs.access(filePath);
			return true;
		} catch {
			return false;
		}
	}

	static async createThumbPath(): Promise<void> {
		try {
			await fs.access(File.imagesThumbPath);
		} catch {
			fs.mkdir(File.imagesThumbPath);
		}
	}

	static async createThumb(params: ImageQuery): Promise<null | string> {
		if (!params.Image || !params.W || !params.H) {
			return null; // Nothing to do
		}

		const filePathFull: string = path.resolve(
			File.imagesFullPath,
			`${params.Image}.jpg`,
		);
		const filePathThumb: string = path.resolve(
			File.imagesThumbPath,
			`${params.Image}-${params.W}x${params.H}.jpg`,
		);

		console.log(`Creating thumb ${filePathThumb}`);

		// Resize original image and store as thumb
		return await resizeImage({
			source: filePathFull,
			target: filePathThumb,
			W: parseInt(params.W),
			H: parseInt(params.H),
		});
	}
}
