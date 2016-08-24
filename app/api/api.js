import express from 'express';
import userApi from './users';
import sessionsApi from './sessions';
import uploadedImagesApi from './uploaded-images';
const router = express.Router();

router.use('/users', userApi);
router.use('/sessions', sessionsApi);
router.use('/uploadedImages', uploadedImagesApi);

export default router;
