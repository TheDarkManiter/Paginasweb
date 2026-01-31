const { corsOrigin } = require('./env');

const origin = corsOrigin === '*' ? '*' : corsOrigin.split(',').map((o) => o.trim()).filter(Boolean);

const corsOptions = {
  origin,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = { corsOptions };
