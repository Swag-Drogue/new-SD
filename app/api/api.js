import express from 'express';
import userApi from './users';
import sessionsApi from './sessions';
const router = express.Router();

router.use('/users', userApi);
router.use('/sessions',sessionsApi);

export default router;
