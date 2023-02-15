export const sessionStoreOptions = {
  host: '127.0.0.1',
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  clearExpired: true,
  checkExpirationInterval: 1000 * 60 * 2, // 2분
  expiration: 1000 * 60, // 1분임
};
