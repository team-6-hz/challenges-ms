import express from 'express';
import * as challengeController from '../controllers/challengeController.js';
const router = express.Router();
// router.get('/challenges', challengeController.getAllChallenges);
router.get('/challenges/:id', challengeController.getChallengeById);
router.get('/challenges/', challengeController.getChallenges); // get all challenges
router.post('/challenges/completeChallenge', challengeController.completeChallenge); // complete a challenge
router.get('/challenges/checkChallenge/:userId/:challengeId', challengeController.hasUserCompletedChallenge); // check if a user has completed a challenge

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default router;
