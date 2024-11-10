import pino from "pino";

const parentLogger = pino(
  {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  }
);
export const logger = parentLogger.child({component: 'calculateEyeColor'})
