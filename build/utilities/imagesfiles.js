"use strict";
/*
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var img_manpulation_1 = __importDefault(require("./img-manpulation"));
var ImageFile = /** @class */ (function () {
    function ImageFile() {
    }
    ImageFile.requiredImage = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var imagePath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!inputs.Image) {
                            return [2 /*return*/, null];
                        }
                        imagePath = inputs.W && inputs.H
                            ? // If Yes get resizedImagesPath
                                path_1.default.resolve(ImageFile.resizedImagesPath, "".concat(inputs.Image, "-").concat(inputs.W, "x").concat(inputs.H, ".jpg"))
                            : // If No get defaultImagesPath
                                path_1.default.resolve(ImageFile.defaultImagesPath, "".concat(inputs.Image, ".jpg"));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        // Then Access to this imagepath
                        return [4 /*yield*/, fs_1.promises.access(imagePath)];
                    case 2:
                        // Then Access to this imagepath
                        _b.sent();
                        return [2 /*return*/, imagePath];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Check The Validation on Image Input Query
    ImageFile.validatingImgName = function (Image) {
        if (Image === void 0) { Image = ''; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Image) {
                            return [2 /*return*/, false]; // IF not a valid name
                        }
                        return [4 /*yield*/, ImageFile.imagesResources()];
                    case 1: 
                    // Includes method return boolean Value , if Image included it will return True
                    return [2 /*return*/, (_a.sent()).includes(Image)];
                }
            });
        });
    };
    //Return all Images in Image File.
    ImageFile.imagesResources = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_1.promises.readdir(ImageFile.defaultImagesPath)];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (Image) { return Image.split('.')[0]; })];
                }
            });
        });
    };
    // // Chech If the Image is resized before with same dimensions or not
    ImageFile.resizedBefore = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var imgPath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!inputs.Image || !inputs.W || !inputs.H) {
                            return [2 /*return*/, false]; // IF Not resized return
                        }
                        imgPath = path_1.default.resolve(ImageFile.resizedImagesPath, "".concat(inputs.Image, "-").concat(inputs.W, "x").concat(inputs.H, ".jpg"));
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.promises.access(imgPath)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ImageFile.saveResizedImg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.promises.access(ImageFile.resizedImagesPath)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        fs_1.promises.mkdir(ImageFile.resizedImagesPath);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ImageFile.imageManpulation = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var ImagePath, ResizedPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!inputs.Image || !inputs.W || !inputs.H) {
                            return [2 /*return*/, null]; // IF No Inputs return
                        }
                        ImagePath = path_1.default.resolve(ImageFile.defaultImagesPath, "".concat(inputs.Image, ".jpg"));
                        ResizedPath = path_1.default.resolve(ImageFile.resizedImagesPath, "".concat(inputs.Image, "-").concat(inputs.W, "x").concat(inputs.H, ".jpg"));
                        return [4 /*yield*/, (0, img_manpulation_1.default)(ImagePath, ResizedPath, parseInt(inputs.W), parseInt(inputs.H))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Images Paths
    ImageFile.defaultImagesPath = path_1.default.resolve(__dirname, '../../images');
    ImageFile.resizedImagesPath = path_1.default.resolve(__dirname, '../../images/resizedImages');
    return ImageFile;
}());
exports.default = ImageFile;
