/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */

import sharp from 'sharp';

// queries
interface sharpResizeParams {
	source: string;
	target: string;
	W: number;
	H: number;
}
const resizeImage = async (
	params: sharpResizeParams,
): Promise<null | string> => {
	try {
		await sharp(params.source)
			.resize(params.W, params.H)
			.toFormat('jpg')
			.toFile(params.target);
		return null;
	} catch {
		return 'Please Enter A valid Params.';
	}
};

export default resizeImage;
