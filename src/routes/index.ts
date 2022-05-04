/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */

import express from 'express';
import images from './api/images';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

routes.get(
	'/',
	(request: express.Request, response: express.Response): void => {
		response.send(
			` <div style="position: absolute; top: 10%; left: 50%; transform: translateX(-50%); background-color: #DDD; width:60%;padding: 10px; border: 2px solid black;"><h1> Hello There, This Is Image Processing API.</h1>
			<h4>You can use this API as a Placeholder for Images In any of your projects by using the following URL : </br> </br> <a href="">http://localhost:3020/api/images?Image=EnterImgName&W=EnterWidth&H=EnterHeight</a></h4>
			<p style="color:red;">• W and H Should Be A valid Postive Value.</p>
			<p>• Image should be one of the Following <strong>[HookKeeper, MsDamasia, Thecute-Sera, Thegreatest-Alistar, TheSavior]</strong></p> </div>`,
		);
	},
);

export default routes;
