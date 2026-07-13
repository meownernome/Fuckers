"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoModel = exports.initDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Logger_1 = require("../utils/Logger");
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/harval-mc';
const initDatabase = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        Logger_1.logger.info('Connected to MongoDB');
    }
    catch (error) {
        Logger_1.logger.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};
exports.initDatabase = initDatabase;
var MongoModel_1 = require("./MongoModel");
Object.defineProperty(exports, "MongoModel", { enumerable: true, get: function () { return MongoModel_1.MongoModel; } });
//# sourceMappingURL=index.js.map