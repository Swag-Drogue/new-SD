import express from 'express';
import userApi from './users';

const router = express.Router();

router.use('/users', userApi);

export default router;
