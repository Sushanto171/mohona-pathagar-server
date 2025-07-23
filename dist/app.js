"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = require("./app/middlewares/notFound");
const routes_1 = require("./app/routes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: ["https://mohona-pathagar.vercel.app", "http://localhost:5173"],
}));
exports.app.use("/api/", routes_1.router);
exports.app.get("/", (req, res) => {
    res.json({ success: true, message: "Hello World...." });
});
// global 404 route handler
exports.app.use(notFound_1.notFOund);
// global error handler
exports.app.use(globalErrorHandler_1.globalErrorHandler);
