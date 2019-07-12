"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
require('winston-daily-rotate-file');
var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp, colorize = _a.colorize, simple = _a.simple, json = _a.json, printf = _a.printf;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.init = function (params) {
        var filename = params.filename, datePattern = params.datePattern, zippedArchive = params.zippedArchive, maxSize = params.maxSize, maxFiles = params.maxFiles;
        // @ts-ignore
        var opts = {
            filename: filename,
            datePattern: datePattern || 'YYYY-MM-DD',
            maxSize: maxSize || '100m',
            maxFiles: maxFiles || '7d',
        };
        if (zippedArchive)
            opts.zippedArchive = zippedArchive;
        // @ts-ignore
        var transport = new winston.transports.DailyRotateFile(opts);
        var logger = winston.createLogger({
            format: combine(timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }), json()),
            transports: [transport],
        });
        var formatParams = printf(function (_a) {
            var level = _a.level, message = _a.message, timestamp = _a.timestamp;
            var params = { message: message };
            return level + ": " + JSON.stringify(params) + " " + timestamp;
        });
        if (process.env.NODE_ENV !== 'production') {
            logger.add(new winston.transports.Console({
                format: combine(colorize(), simple(), formatParams),
            }));
        }
        return logger;
    };
    return Logger;
}());
exports.default = Logger;
//# sourceMappingURL=index.js.map