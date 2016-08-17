import express from 'express';
import _ from 'lodash';

const users = [];
const router = express.Router();
router.post('/', function (req, res) {
  const data = req.body;
  if (_.isEmpty(data)) {
    res.sendStatus(400);
  } else {
    users.push(data);
    res.sendStatus(201);
  }
});

export default router;
