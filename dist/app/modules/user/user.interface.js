"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IActive = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
})(Role || (exports.Role = Role = {}));
var IActive;
(function (IActive) {
    IActive["ACTIVE"] = "ACTIVE";
    IActive["INACTIVE"] = "INACTIVE";
    IActive["BLOCKED"] = "BLOCKED";
})(IActive || (exports.IActive = IActive = {}));
