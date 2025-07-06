"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use("/api/", routes_1.router);
exports.app.get("/", (req, res) => {
    res.json({ success: true, message: "Hello World...." });
});
// global 404 route handler
exports.app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        massage: `The path '${req.path}' was not found on this server.`,
    });
});
// global error handler
exports.app.use((err, req, res, next) => {
    // console.log(err);
    res.json({
        success: false,
        message: err.message,
        error: err,
    });
});
