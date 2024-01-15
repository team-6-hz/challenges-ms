import express from 'express';
import * as challengeController from '../controllers/challengeController.js';
const router = express.Router();
router.get('/challenges', challengeController.getAllChallenges);
router.get('/challenges/:id', challengeController.getChallengeById);
export default router;