import express from 'express';
import {User} from '../db/schema';
import isEmpty from '../../shared/editor-validation';

const router = express();
router.post('/',function (req,res,next) {
  if(isEmpty()){

  }
});

export default router;
