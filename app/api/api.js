import express from 'express';
import userApi from './users';
import sessionsApi from './sessions';
import cookieApi from  './personal';
const router = express.Router();

router.use('/users', userApi);
router.use('/sessions',sessionsApi);
router.use('/personal',cookieApi);

export default router;
