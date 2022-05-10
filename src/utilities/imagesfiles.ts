/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */

import { promises as fs } from 'fs';
import path from 'path';
import resizeImage from './img-manpulation';

// Input queries
interface InputQuery {
	Image?: string;
	W?: string;
	H?: string;
}

export default class ImageFile {
	// Images Paths
	static defaultImagesPath = path.resolve(__dirname, '../../images');
	static resizedImagesPath = path.resolve(
		__dirname,
		'../../images/resizedImages',
	);

	static async requiredImage(inputs: InputQuery): Promise<null | string> {
		if (!inputs.Image) {
			return null;
		}
		// Chech If Required Image is resized before with same dimensions or not
		const imagePath =
			inputs.W && inputs.H
				? // If Yes get resizedImagesPath
				  path.resolve(
						ImageFile.resizedImagesPath,
						`${inputs.Image}-${inputs.W}x${inputs.H}.jpg`,
				  )
				: // If No get defaultImagesPath
				  path.resolve(ImageFile.defaultImagesPath, `${inputs.Image}.jpg`);
		try {
			// Then Access to this imagepath
			await fs.access(imagePath);
			return imagePath;
		} catch {
			return null;
		}
	}

	// Check The Validation on Image Input Query
	static async validatingImgName(Image: string = ''): Promise<boolean> {
		if (!Image) {
			return false; // IF not a valid name
		}
		// Includes method return boolean Value , if Image included it will return True
		return (await ImageFile.imagesResources()).includes(Image);
	}
	//Return all Images in Image File.
	static async imagesResources() {
		return (await fs.readdir(ImageFile.defaultImagesPath)).map(
			(Image) => Image.split('.')[0],
		);
	}
	// // Chech If the Image is resized before with same dimensions or not
	static async resizedBefore(inputs: InputQuery): Promise<boolean> {
		if (!inputs.Image || !inputs.W || !inputs.H) {
			return false; // IF Not resized return
		}

		const imgPath = path.resolve(
			ImageFile.resizedImagesPath,
			`${inputs.Image}-${inputs.W}x${inputs.H}.jpg`,
		);

		try {
			await fs.access(imgPath);
			return true;
		} catch {
			return false;
		}
	}

	static async saveResizedImg(): Promise<void> {
		try {
			await fs.access(ImageFile.resizedImagesPath);
		} catch {
			fs.mkdir(ImageFile.resizedImagesPath);
		}
	}

	static async imageManpulation(inputs: InputQuery): Promise<null | string> {
		if (!inputs.Image || !inputs.W || !inputs.H) {
			return null; // IF No Inputs return
		}

		const ImagePath: string = path.resolve(
			ImageFile.defaultImagesPath,
			`${inputs.Image}.jpg`,
		);
		const ResizedPath: string = path.resolve(
			ImageFile.resizedImagesPath,
			`${inputs.Image}-${inputs.W}x${inputs.H}.jpg`,
		);

		return await resizeImage(
			ImagePath,
			ResizedPath,
			parseInt(inputs.W),
			parseInt(inputs.H),
		);
	}
}
