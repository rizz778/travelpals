import express from 'express';
import { getNearbyStudents, getUser } from '../controllers/userController.js';
import auth from '../middlewares/authMiddleware.js'; // Assuming auth middleware is defined

const router = express.Router();

// Route to fetch nearby students based on metro station
router.get('/nearby-students/:metro', getNearbyStudents);

// Route to fetch user details (protected with auth middleware)
router.get('/user', auth, getUser);

export default router;

