// controller.js

// Mock data (replace with database)
const challenges = [
  { id: 1, description: 'Take a 10-minute mindfulness meditation break.' },
  { id: 2, description: 'Write down three things you are grateful for today.' },
  { id: 3, description: 'Disconnect from social media for an hour.' },
  { id: 4, description: 'Listen to calming music for 15 minutes.' },
  { id: 5, description: 'Practice deep breathing exercises for 5 minutes.' },
  { id: 6, description: 'Create a positive affirmations list and read it aloud.' },
  { id: 7, description: 'Do a quick desk or stretching exercise at work.' },
  { id: 8, description: 'Try a new hobby or revisit an old one for 20 minutes.' },
  { id: 9, description: 'Have a technology-free evening and focus on analog activities.' },
  { id: 10, description: 'Write a letter to yourself about a recent accomplishment.' },
  { id: 11, description: 'Take a warm bath or shower to relax your muscles.' },
  { id: 12, description: 'Plan a virtual coffee date with a friend or family member.' },
  { id: 13, description: 'Create a peaceful and clutter-free environment for 30 minutes.' },
  { id: 14, description: 'Practice progressive muscle relaxation for 10 minutes.' },
  { id: 15, description: 'Engage in a creative activity like drawing, painting, or writing.' },
  { id: 16, description: 'Explore a nature walk or spend time in a green space.' },
  { id: 17, description: 'Challenge negative thoughts by writing positive affirmations.' },
  { id: 18, description: 'Organize and declutter a small area of your living space.' },
  { id: 19, description: 'Do a quick workout or stretch routine to release tension.' },
  { id: 20, description: 'Set realistic goals for the day and celebrate small achievements.' },
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
