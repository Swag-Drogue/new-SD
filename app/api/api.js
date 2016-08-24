import express from 'express';
import userApi from './users';
import sessionsApi from './sessions';
import articleApi from './article';
import uploadedImagesApi from './uploaded-images';
const router = express.Router();

router.use('/users', userApi);
router.use('/sessions', sessionsApi);
router.use('/article', articleApi);
router.use('/uploadedImages', uploadedImagesApi);

export default router;
