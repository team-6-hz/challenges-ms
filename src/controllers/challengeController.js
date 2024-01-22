// Import necessary modules and libraries
import cors from 'cors'; // CORS middleware for handling Cross-Origin Resource Sharing
import express from 'express'; // Express framework for building web applications
import { createClient } from '@supabase/supabase-js'; // Supabase client for interacting with Supabase
import dotenv from 'dotenv'; // Load environment variables from a .env file

// Load environment variables from the .env file
dotenv.config({ path: './/.env' });

// Initialize Supabase client with the provided environment variables
const supabase = createClient("https://sgrtrvnslhhjwrclsvtw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNncnRydm5zbGhoandyY2xzdnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExNzc3NTUsImV4cCI6MjAxNjc1Mzc1NX0.ZI3K70sK9mGp02UwDHLkBoAYneSXZObwdUDOm-xFJ7k");

// Function to fetch data from the 'challenges' table in Supabase
async function getData() {
  try {
    // Use the Supabase client to select all data from the 'challenges' table
    const { data, error } = await supabase.from('challenges').select('*');

    // Handle errors, if any, during the data retrieval
    if (error) {
      console.log('query error', error);
    } else {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log('error', error);
  }
}

// Controller function to get all challenges
export const getChallenges = async function getChallengeData(req, res, next) {
  try {
    // Respond with the data obtained from the 'challenges' table
    res.json(await getData());
  } catch (error) {
    // Pass any encountered error to the error handling middleware
    next(error);
  }
};

// Controller function to get all challenges (Note: challenges variable is assumed to be defined elsewhere)
export const getAllChallenges = async (req, res) => {
  try {
    // Assuming challenges is some asynchronous data retrieval operation
    res.json(challenges);
  } catch (error) {
    console.error('Error getting challenges:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get a specific challenge by ID
export const getChallengeById = async (req, res) => {
  try {
    // Extract the challenge ID from the request parameters
    const challengeId = parseInt(req.params.id);

    // Flatten the array to make all challenges at the same level
    const flatChallenges = challenges.flat();

    // Find the challenge with the specified ID
    const challenge = flatChallenges.find((ch) => ch.id === challengeId);

    // Respond based on whether the challenge was found or not
    if (challenge) {
      res.json(challenge);
    } else {
      res.status(404).json({ error: 'Challenge not found' });
    }
  } catch (error) {
    console.error('Error getting challenge by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to mark a challenge as completed
export const completeChallenge = async (req, res) => {
  try {
    // Extract challenge ID and user ID from the request body
    let challengeId = req.body.challengeId; // Assuming challenge_id is in the request body
    let userId = req.body.userId; // Assuming user_id is in the request body
    console.log('Received');
    console.log(challengeId);
    console.log(userId);

    // Return an error response if either user ID or challenge ID is undefined
    if (!userId || !challengeId) {
      console.error('User ID or Challenge ID is undefined.');
      return res.status(400).json({ success: false, error: 'User ID or Challenge ID is undefined.' });
    }

    // Generate completed_at (assuming it is generated in your server)
    const completed_at = new Date().toISOString();

    // Include only relevant data in dataToUpsert
    const dataToUpsert = [
      {
        user_id: userId,
        challenge_id: challengeId,
        completed_at: completed_at,
      },
    ];

    // Log data to upsert
    console.log('Data to upsert:', dataToUpsert);

    // Upsert the data into the 'challenge_completions' table in Supabase
    const { data, error } = await supabase.from('challenge_completions').upsert(dataToUpsert);

    // Handle errors during the upsert operation
    if (error) {
      console.error('Error completing challenge:', error);
      return res.status(500).json({ success: false, error });
    }

    // Return success response with the upserted data
    return res.status(200).json({ success: true, data });
  } catch (error) {
    // Handle any other errors that might occur
    console.error('Error completing challenge:', error);
    return res.status(500).json({ success: false, error });
  }
};

// Controller function to check if a user has completed a specific challenge
export const hasUserCompletedChallenge = async (req, res) => {
  // Extract user ID and challenge ID from the request parameters
  let userId = req.params.userId; // Assuming user_id is in the request body
  let challengeId = req.params.challengeId; // Assuming challenge_id is in the request body

  try {
    console.log('Received request');

    // Use the Supabase client to select data from 'challenge_completions' based on user and challenge IDs
    const { data, error } = await supabase
      .from('challenge_completions')
      .select()
      .eq('user_id', userId)
      .eq('challenge_id', challengeId);

    // Respond based on whether data was retrieved and if the challenge was completed
    if (data) {
      res.json(data.length > 0);
    } else {
      res.status(404).json({ error: 'Challenge not found' });
    }

    // Return to signify the end of the function
    return;
  } catch (error) {
    // Handle any errors that might occur during the process
    console.error('Error checking completion:', error);
    return false;
  }
};
