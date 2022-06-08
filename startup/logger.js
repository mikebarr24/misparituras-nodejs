import { createLogger, transports, format, exceptions } from "winston";
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    format.colorize(),
    format.prettyPrint(),
    myFormat
  ),
  transports: [
    new transports.Console({ colorize: true, prettyPrint: true }),
    new transports.File({ filename: "log.log" }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: "exceptions.log" }),
    new transports.Console({ colorize: true, prettyPrint: true }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: "rejections.log" }),
    new transports.Console({ colorize: true, prettyPrint: true }),
  ],
});

export default logger;
