"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFOund = void 0;
const notFOund = (req, res) => {
    res.status(404).json({
        success: false,
        massage: `The path '${req.path}' was not found on this server.`,
    });
};
exports.notFOund = notFOund;
