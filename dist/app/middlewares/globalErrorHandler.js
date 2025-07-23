"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const AppError_1 = require("../errorHelpers/AppError");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = `Something went wrong ${err.message}`;
    if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message: err.message;
    }
    res.status(err.statusCode).json({
        message: err.message,
        stack: err.stack,
    });
};
exports.globalErrorHandler = globalErrorHandler;
