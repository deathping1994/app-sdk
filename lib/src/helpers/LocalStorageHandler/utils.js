"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExpired = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const expiryInMinutes = 5;
exports.isExpired = (item) => {
    const now = dayjs_1.default();
    const storedTime = dayjs_1.default(item.timestamp);
    return now.diff(storedTime, "minute") > expiryInMinutes;
};
//# sourceMappingURL=utils.js.map