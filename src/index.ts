import {createLogger, Logger, format, transports} from 'winston';

require('winston-daily-rotate-file');

interface IIogger {
  filename: string; // 文件名
  datePattern?: string;
  zippedArchive?: boolean;
  maxSize?: string;
  maxFiles?: string;
  exceptions?: boolean;
  exceptionsFile?: string;
}

const {combine, timestamp, colorize, simple, json, printf} = format;

export default class Log {
  init(params: IIogger): Logger {
    const {
      filename,
      datePattern,
      zippedArchive,
      maxSize,
      maxFiles,
      exceptions,
      exceptionsFile,
    } = params;
    // @ts-ignore
    const opts: IIogger = {
      filename: `${filename}_%DATE%.log`,
      datePattern: datePattern || 'YYYY-MM-DD',
      maxSize: maxSize || '100m',
      maxFiles: maxFiles || '7d',
    };
    if (zippedArchive) opts.zippedArchive = zippedArchive;

    // @ts-ignore
    var transport = new transports.DailyRotateFile(opts);

    var logger = createLogger({
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

    if (exceptions) {
      logger.exceptions.handle(new transports.File({filename: exceptionsFile}));
    }

    if (process.env.NODE_ENV !== 'production') {
      logger.add(
        new transports.Console({
          format: combine(colorize(), simple(), formatParams),
        })
      );
    }
    return logger;
  }
}
