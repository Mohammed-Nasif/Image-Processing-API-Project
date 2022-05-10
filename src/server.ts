/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */

import express from 'express';
import routes from './routes/index';
import ImageFile from './utilities/imagesfiles';

const app = express();
const port = 3020;

// Start server
app.listen(port, async (): Promise<void> => {
	console.log(`Server Started at http://localhost:${port}`);
	await ImageFile.saveResizedImg();
});

// Add routes
app.use(routes);

export default app;
