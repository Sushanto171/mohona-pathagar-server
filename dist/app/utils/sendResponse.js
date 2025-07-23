"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        data: data.data,
        message: data.message,
        meta: data.meta,
    });
};
exports.sendResponse = sendResponse;
