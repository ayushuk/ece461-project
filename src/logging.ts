// logger.ts
import * as winston from "winston";

require("dotenv").config();
console.log(`Hello: ${process.env.LOG_FILE}`);

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: `${process.env.LOG_FILE}`,
      options: { flags: "w" },
    }),
  ],
});

export default logger;
