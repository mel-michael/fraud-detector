export const ENV = {
  dev: 'development',
  prod: 'production',
  test: 'testing'
};

let config = {
  environment: process.env.NODE_ENV || ENV.dev,
  port: process.env.PORT || 5000,
  db_host: process.env.DB_HOST || 'localhost:27017',
  db_name: process.env.DB_NAME || 'detectors',
  db_user: process.env.DB_USER || '',
  db_password: process.env.DB_PASSWORD || '',
  logging: true,
};

// merge environment specific config to default config.
config = {
  ...config,
  ...require(`./${config.environment}`).config
};

export default config;
