/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */

import sharp from 'sharp';

const resizeImage = async (
	source: string,
	target: string,
	W: number,
	H: number,
): Promise<null | string> => {
	try {
		await sharp(source).resize(W, H).toFormat('jpg').toFile(target);
		return null;
	} catch {
		return 'Please Check Your Inputs.';
	}
};

export default resizeImage;
