const app = require('./src/app');

const PORT = process.env.HOST || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log('error');
  } else {
    console.log(`Server listening at ${PORT}`);
  }
});
