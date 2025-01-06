import express from 'express';
const app = express();

app.get('/', (req, res) => {
  console.log('Request received on server'); // Logs to terminal
  res.send('Server is running!');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000'); // Logs to terminal
});
