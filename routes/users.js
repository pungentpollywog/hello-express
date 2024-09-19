import express from 'express';
import { setUsers, getUsers } from '../controllers/io-utils.js';

const { randomUUID } = await import('node:crypto');

const router = express.Router();

router.all('/', (req, res, next) => {
  console.log('For all endpoints, pull all users.');
  getUsers()
    .then((users) => {
      req.users = users;
    })
    .finally(() => {
      next();
    });
});

router.get('/', (req, res) => {
  console.log('retrieve all users.');
  res.send(req.users ?? []);
});

router.get('/:id', (req, res) => {
  console.log('retrieve user with id:', req.params.id);
  const user = req.users?.find((user) => user.id === req.params.id);
  res.send(user ?? {});
});

router.post('/', (req, res) => {
  const id = randomUUID();
  const user = { ...req.body, id: id };
  console.log('add user:', JSON.stringify(user));
  console.log('users:', req.users);
  req.users = [...req.users, user];
  try {
    setUsers(req.users);
    res.send(id);
  } catch (err) {
    console.error(err);
    res.end();
  }
});

// TODO: router.put()

router.delete('/:id', (req, res) => {
  const idx = req.users?.find((user) => user.id === req.params.id) ?? -1;
  if (idx !== -1) {
    const updatedUsers = req.users?.toSpliced(idx, 1);
    setUsers(updatedUsers).then(() => res.end());
  } else {
    res.end();
  }
});

export default router;
