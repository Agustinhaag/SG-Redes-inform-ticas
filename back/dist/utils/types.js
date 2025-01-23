"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["USER"] = "user";
})(Role || (exports.Role = Role = {}));
var Status;
(function (Status) {
    Status["ACTIVE"] = "active";
    Status["SUSPENDED"] = "suspended";
})(Status || (exports.Status = Status = {}));
