"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Storage {
    constructor(storagePath) {
        this.data = [];
        this.storagePath = storagePath;
        this.loadData();
    }
    loadData() {
        if (fs.existsSync(this.storagePath)) {
            const rawData = fs.readFileSync(this.storagePath, 'utf-8');
            this.data = JSON.parse(rawData);
        }
        else {
            this.data = [];
        }
    }
    saveData() {
        const dirPath = path.dirname(this.storagePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(this.storagePath, JSON.stringify(this.data, null, 2), 'utf-8');
    }
    get(id) {
        return this.data.find(user => user.telegramId === id);
    }
    set(user) {
        const index = this.data.findIndex(u => u.telegramId === user.telegramId);
        if (index !== -1) {
            this.data[index] = user;
        }
        else {
            this.data.push(user);
        }
        this.saveData();
    }
}
exports.storage = new Storage(path.join(__dirname, 'storage.json'));
