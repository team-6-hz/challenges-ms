// index.js

const express = require('express');
const challengeController = require('./controller'); // Assuming your controller file is named controller.js

const app = express();
const PORT = 3000;

// Middleware setup (if needed)
app.use(express.json());

// Routes setup
app.get('/challenges', challengeController.getAllChallenges);
app.get('/challenges/:id', challengeController.getChallengeById);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
