"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Club_Remove = exports.Club_View = exports.Club_Edit = exports.Club_Create = void 0;
const club_create_1 = __importDefault(require("./club_create"));
exports.Club_Create = club_create_1.default;
const club_edit_1 = __importDefault(require("./club_edit"));
exports.Club_Edit = club_edit_1.default;
const club_view_1 = __importDefault(require("./club_view"));
exports.Club_View = club_view_1.default;
const club_remove_1 = __importDefault(require("./club_remove"));
exports.Club_Remove = club_remove_1.default;
