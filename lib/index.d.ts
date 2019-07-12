import * as winston from 'winston';
interface IIogger {
    filename: string;
    datePattern?: string;
    zippedArchive?: boolean;
    maxSize?: string;
    maxFiles?: string;
}
export default class Logger {
    init(params: IIogger): winston.Logger;
}
export {};
