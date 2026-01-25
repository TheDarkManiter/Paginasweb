const env = process.env;

const config = {
  port: Number(env.PORT) || 3000,
  databaseUrl: env.DATABASE_URL || '',
  jwtSecret: env.JWT_SECRET || '',
  corsOrigin: env.CORS_ORIGIN || '*'
};

module.exports = config;
