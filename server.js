const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/error', (req, res) => {
  try {
    throw new Error('This is a test error');
  } catch (error) {
    console.error('Caught error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error was caught and logged.'
    });
  }
});

app.get('/api/log', (req, res) => {
  console.log('Log message sent from the button click');
  res.json({
    success: true,
    message: 'Log message sent successfully.'
  });
});

app.get('/health-probe', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'ok'
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
