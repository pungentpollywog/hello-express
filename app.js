import express from 'express';
import birdsRouter from './routes/birds.js';

const app = express();
const port = 3000;

app.use('/birds', birdsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
