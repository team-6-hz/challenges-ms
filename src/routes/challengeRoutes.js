import express from 'express';
import * as challengeController from '../controllers/challengeController.js';
const router = express.Router();
router.get('/challenges', challengeController.getAllChallenges);
router.get('/challenges/:id', challengeController.getChallengeById);
router.get('/getChallenges', challengeController.getChallenges);
router.post('/completeChallenge', challengeController.completeChallenge);
router.get('/checkChallengeCompletion/:userId/:challengeId', challengeController.hasUserCompletedChallenge);


export default router;