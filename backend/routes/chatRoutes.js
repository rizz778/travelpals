import express from 'express';
import { getChatHistory } from '../controllers/chatController.js';
import auth from '../middlewares/authMiddleware.js' 

const router = express.Router();

router.get('/:recipientId', auth, getChatHistory);


  
  
export default router;