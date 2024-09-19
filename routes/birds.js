import express from 'express';

const router = express.Router();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
};
router.use(timeLog);

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page');
});
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds');
});

router.get('/users/:user_id', function (req, res, next) {
  console.log('although this matches', req.userId);
  next();
});

router.param('user_id', function (req, res, next, id) {
  console.log('Called only once and called first.', id);
  req.userId = id;
  next();
});

router.get('/users/:user_id', function (req, res) {
  console.log('and this matches too', req.userId);
  res.header = { ...res.header, statusCode: 200 };
  res.send(`Response about bird with id: ${req.userId}`);
});

// module.exports = router
export default router;
