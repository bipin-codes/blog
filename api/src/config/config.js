module.exports = {
  PGHOST: process.env.PGHOST,
  PGDATABASE: process.env.PGDATABASE,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PORT: process.env.PORT,
  AUTHY_API_KEY: process.env.AUTHY_API_KEY,
  AUTHY_ACCOUNT_SID: process.env.AUTHY_ACCOUNT_SID,
  AUTHY_AUTH_TOKEN: process.env.AUTHY_AUTH_TOKEN,
  AUTHY_USER_ID: process.env.AUTH_USER_ID, //admin user's authy id on which we send notification we have hardcoded this since we aren't registering the admin user.
  BASE_URL: '/api/v1',
};
