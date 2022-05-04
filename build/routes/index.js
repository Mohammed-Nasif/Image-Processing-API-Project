"use strict";
/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("./api/images"));
var routes = express_1.default.Router();
routes.use('/api/images', images_1.default);
routes.get('/', function (request, response) {
    response.send(" <div style=\"position: absolute; top: 10%; left: 50%; transform: translateX(-50%); background-color: #DDD; width:60%;padding: 10px; border: 2px solid black;\"><h1> Hello There, This Is Image Processing API.</h1>\n\t\t\t<h4>You can use this API as a Placeholder for Images In any of your projects by using the following URL : </br> </br> <a href=\"\">http://localhost:3020/api/images?Image=EnterImgName&W=EnterWidth&H=EnterHeight</a></h4>\n\t\t\t<p style=\"color:red;\">\u2022 W and H Should Be A valid Postive Value.</p>\n\t\t\t<p>\u2022 Image should be one of the Following <strong>[HookKeeper, MsDamasia, Thecute-Sera, Thegreatest-Alistar, TheSavior]</strong></p> </div>");
});
exports.default = routes;
