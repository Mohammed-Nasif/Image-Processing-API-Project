/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */

import express from 'express';
import ImageFile from '../../utilities/imagesfiles';

// Input queries
interface InputQuery {
	Image?: string;
	W?: string;
	H?: string;
}

// Validating the entries queries
const validation = async (Inputs: InputQuery): Promise<null | string> => {
	/*
	- 1st Check The Image Name if it's included in the images in imagesfile 
	*/
	if (!(await ImageFile.validatingImgName(Inputs.Image))) {
		return `Please Enter a valid Image Name From Available Images: [HookKeeper, MsDamasia, Thecute-Sera, Thegreatest-Alistar, TheSavior].`;
	}
	/*
	- 2nd Check if user has entered Width and Height or not it's empty
	*/
	if (!Inputs.W && !Inputs.H) {
		return 'Please Enter A valid positive value for the Width and Height.';
	}
	/*
	- 3rd Check if user has entered Width is a Postive Number and not a NaN
	*/
	const W: number = +Number(Inputs.W);
	if (Number.isNaN(W) || W < 1) {
		return 'Please Enter A valid positive value for the Width (W).';
	}
	/*
	- 4th Check if user has entered Height is a Postive Number and not a NaN
	*/
	const H: number = +Number(Inputs.H);
	if (Number.isNaN(H) || H < 1) {
		return 'Please Enter A valid positive value for the Height (H).';
	}

	return null;
};

const images = express.Router();
// After Validation
images.get(
	'/',
	async (
		request: express.Request,
		response: express.Response,
	): Promise<void> => {
		const validationMessage: null | string = await validation(request.query);
		if (validationMessage) {
			response.send(validationMessage);
			return;
		}

		let error: null | string = '';

		// Create if the same Image Resized Before
		if (!(await ImageFile.resizedBefore(request.query))) {
			error = await ImageFile.imageManpulation(request.query);
		}

		if (error) {
			response.send(error);
			return;
		}

		// Get image path and display it.
		const path: null | string = await ImageFile.requiredImage(request.query);
		if (path) {
			response.sendFile(path);
		} else {
			// If there is an error, could be from server.
			response.send("Oo What's Happen! Try again.");
		}
	},
);

export default images;
