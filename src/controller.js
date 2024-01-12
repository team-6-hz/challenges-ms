// controller.js

// Mock data (replace with database)
const challenges = [
  { id: 1, description: 'Challenge 1' },
  { id: 2, description: 'Challenge 2' },
];

// Controller function to get all challenges
exports.getAllChallenges = (req, res) => {
  res.json(challenges);
};

// Controller function to get a specific challenge by ID
exports.getChallengeById = (req, res) => {
  const challengeId = parseInt(req.params.id);
  const challenge = challenges.find(ch => ch.id === challengeId);

  if (challenge) {
    res.json(challenge);
  } else {
    res.status(404).json({ error: 'Challenge not found' });
  }
};
