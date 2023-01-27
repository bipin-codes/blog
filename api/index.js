const app = require('./src/app');
const config = require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
const { HOST, MODE } = process.env;
const PORT = HOST || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log('error');
  } else {
    console.log(`Server listening at ${PORT}`);
  }
});
