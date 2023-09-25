import {createLogger, format, transports} from 'winston'
import * as dotenv from 'dotenv'

const {combine, timestamp, json, prettyPrint} = format
dotenv.config()

const logLevel: { [key: string]: string } = {
  1: 'info',
  2: 'debug',
};

const logger = createLogger({
  silent: process.env.LOG_LEVEL === '0',
  format: combine(timestamp(), json(), prettyPrint()),
  transports: [
    new transports.File({
      filename: `${process.env.LOG_FILE}`,
      level: logLevel[process.env.LOG_LEVEL || '0'],
    }),
  ],
})
logger.info("logger initialized")
export default logger

/*
// Usage: winston allows you to define a level property on each transport which specifies the maximum level of messages that a transport should log.
// Logger configuration is set in the logger.ts file using process.env. (e.g. if LOG_LEVEL=1 (i.e. info), then logger.debug() will not be logged)

if (process.env.LOG_LEVEL != 0) {
// if informational message:
    logger.info(message)
// if debug message:
    logger.debug(message)
}

*/
