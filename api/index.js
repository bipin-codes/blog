const express = require('express');

const app = express();
const PORT = process.env.HOST || 5000;
app.get('/', (req, res) => {
  res.json('okay');
});
app.listen(PORT, (err) => {
  if (err) {
    console.log('error');
  } else {
    console.log(`Server listening at ${PORT}`);
  }
});
