"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = require("express");
const borrow_controllers_1 = require("./borrow.controllers");
exports.borrowRoutes = (0, express_1.Router)();
exports.borrowRoutes.post("/", borrow_controllers_1.createBorrow);
