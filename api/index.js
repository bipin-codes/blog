const express = require('express');

const app = express();
const PORT = process.env.HOST || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.log('error');
  } else {
    console.log(`Server listening at ${PORT}`);
  }
});
