import express from 'express';
import userApi from './users';
import sessionsApi from './sessions';
import uploadedImagesApi from './uploaded-images';
import articlesApi from './paragraph';
const router = express.Router();

router.use('/users', userApi);
router.use('/sessions', sessionsApi);
router.use('/uploaded-images', uploadedImagesApi);
router.use('/articles', articlesApi);

export default router;
