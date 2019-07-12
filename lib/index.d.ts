import { Logger } from 'winston';
interface IIogger {
    filename: string;
    datePattern?: string;
    zippedArchive?: boolean;
    maxSize?: string;
    maxFiles?: string;
    exceptions?: boolean;
    exceptionsFile?: string;
}
export default class Log {
    init(params: IIogger): Logger;
}
export {};
