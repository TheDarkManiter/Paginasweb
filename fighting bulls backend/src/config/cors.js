const { corsOrigin } = require('./env');

const origin = corsOrigin === '*' ? '*' : corsOrigin.split(',').map((o) => o.trim()).filter(Boolean);

const corsOptions = {
  origin
};

module.exports = { corsOptions };
