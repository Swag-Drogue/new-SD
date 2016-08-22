import express from 'express';
import userApi from './users';
import loginApi from './sessions';

const router = express.Router();

router.use('/users', userApi);
router.use('/sessions',loginApi);

export default router;
