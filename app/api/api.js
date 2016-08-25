import express from 'express';
import userApi from './users';
import sessionsApi from './sessions';
import uploadedImagesApi from './images';
import articlesApi from './articles';
const router = express.Router();

router.use('/users', userApi);
router.use('/sessions', sessionsApi);
router.use('/uploaded-images', uploadedImagesApi);
router.use('/articles', articlesApi);

export default router;
