/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */

import express from 'express';
import routes from './routes/index';
import File from './file';

const app: express.Application = express();
const port: number = 3020;

// Add routes
app.use(routes);

// Start server
app.listen(port, async (): Promise<void> => {
	await File.createThumbPath();
	console.log(`Server Started at http://localhost:${port}`);
});

export default app;
