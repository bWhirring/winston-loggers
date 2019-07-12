import * as winston from 'winston';

require('winston-daily-rotate-file');

interface IIogger {
  filename: string; // 文件名
  datePattern?: string;
  zippedArchive?: boolean;
  maxSize?: string;
  maxFiles?: string;
}

const {combine, timestamp, colorize, simple, json, printf} = winston.format;

export default class Logger {
  init(params: IIogger) {
    const {filename, datePattern, zippedArchive, maxSize, maxFiles} = params;
    // @ts-ignore
    const opts: IIogger = {
      filename,
      datePattern: datePattern || 'YYYY-MM-DD',
      maxSize: maxSize || '100m',
      maxFiles: maxFiles || '7d',
    };
    if (zippedArchive) opts.zippedArchive = zippedArchive;

    // @ts-ignore
    var transport = new winston.transports.DailyRotateFile(opts);

    var logger = winston.createLogger({
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        json()
      ),
      transports: [transport],
    });

    const formatParams = printf(({level, message, timestamp}) => {
      const params = {message};
      return `${level}: ${JSON.stringify(params)} ${timestamp}`;
    });

    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new winston.transports.Console({
          format: combine(colorize(), simple(), formatParams),
        })
      );
    }
    return logger;
  }
}
