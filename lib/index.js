"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
require('winston-daily-rotate-file');
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, colorize = winston_1.format.colorize, simple = winston_1.format.simple, json = winston_1.format.json, printf = winston_1.format.printf;
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.prototype.init = function (params) {
        var filename = params.filename, datePattern = params.datePattern, zippedArchive = params.zippedArchive, maxSize = params.maxSize, maxFiles = params.maxFiles;
        // @ts-ignore
        var opts = {
            filename: filename + "_%DATE%.log",
            datePattern: datePattern || 'YYYY-MM-DD',
            maxSize: maxSize || '100m',
            maxFiles: maxFiles || '7d',
        };
        if (zippedArchive)
            opts.zippedArchive = zippedArchive;
        // @ts-ignore
        var transport = new winston_1.transports.DailyRotateFile(opts);
        var logger = winston_1.createLogger({
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
            logger.add(new winston_1.transports.Console({
                format: combine(colorize(), simple(), formatParams),
            }));
        }
        return logger;
    };
    return Log;
}());
exports.default = Log;
//# sourceMappingURL=index.js.map