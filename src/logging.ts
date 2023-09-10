const pino = require('pino')
const pretty = require('pino-pretty')
const stream = pretty({
  colorize: true,
})

const logger = pino(stream)


/*
When using JEST

import pino from 'pino'
import pretty from 'pino-pretty'

test('test pino-pretty', () => {
  const logger = pino(pretty({ sync: true }));
  logger.info('Info');
  logger.error('Error');
});

*/