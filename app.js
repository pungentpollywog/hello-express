import express from 'express';
import bodyParser from 'body-parser';

import birdsRouter from './routes/birds.js';
import usersRouter from './routes/users.js';

const app = express();
const port = 3000;

// parse application/json
app.use(bodyParser.json());

app.use('/birds', birdsRouter);

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
