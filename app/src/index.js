const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/healthz', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('Hello, Docker CI/CD!');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on :${port}`);
  });
}

module.exports = app;