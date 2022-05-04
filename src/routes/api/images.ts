/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */

import express from 'express';
import File from './../../file';

// queries
interface ImageQuery {
	Image?: string;
	W?: string;
	H?: string;
}

// Validating the entries queries
const validate = async (query: ImageQuery): Promise<null | string> => {
	// Check if requested file is available
	if (!(await File.isImageAvailable(query.Image))) {
		return `Please Enter a valid Image Name From Available Images: [HookKeeper, MsDamasia, Thecute-Sera, Thegreatest-Alistar, TheSavior].`;
	}

	if (!query.W && !query.H) {
		return null; // No size values
	}

	// Check for valid W value
	const W: number = parseInt(query.W || '');
	if (Number.isNaN(W) || W < 1) {
		return 'Please Enter A valid positive value for the Width (W).';
	}

	// Check for valid H value
	const H: number = parseInt(query.H || '');
	if (Number.isNaN(H) || H < 1) {
		return 'Please Enter A valid positive value for the Height (H).';
	}

	return null;
};

const images: express.Router = express.Router();

images.get(
	'/',
	async (
		request: express.Request,
		response: express.Response,
	): Promise<void> => {
		// Check whether request can be worked with
		const validationMessage: null | string = await validate(request.query);
		if (validationMessage) {
			response.send(validationMessage);
			return;
		}

		let error: null | string = '';

		// Create thumb if not yet available
		if (!(await File.isThumbAvailable(request.query))) {
			error = await File.createThumb(request.query);
		}

		// Handle image processing error
		if (error) {
			response.send(error);
			return;
		}

		// Retrieve appropriate image path and display image
		const path: null | string = await File.getImagePath(request.query);
		if (path) {
			response.sendFile(path);
		} else {
			response.send("Oo What's Happen! Try again.");
		}
	},
);

export default images;
