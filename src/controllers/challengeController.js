import cors from 'cors';
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: './/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function getData() {
  try {
    const { data, error } = await supabase.from('challenges').select('*');
    if (error) console.log('query error', error);
    else {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log('error', error);
  }
}

export const getChallenges = async function getChallengeData(req, res, next) {
  try {
    res.json(await getData());
  } catch (error) {
    next(error);
  }
};

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
    const challengeId = parseInt(req.params.id);

    // Flatten the array to make all challenges at the same level
    const flatChallenges = challenges.flat();

    const challenge = flatChallenges.find((ch) => ch.id === challengeId);

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

export const completeChallenge = async (req, res) => {
  try {
    
    let challengeId = req.body.challengeId; // Assuming challenge_id is in the request body
    let userId = req.body.user_id; // Assuming user_id is in the request body
    console.log('Received');

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

    console.log('Data to upsert:', dataToUpsert);

    const { data, error } = await supabase
  .from('challenge_completions')
  .upsert(dataToUpsert);


    if (error) {
      console.error('Error completing challenge:', error);
      return res.status(500).json({ success: false, error });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error completing challenge:', error);
    return res.status(500).json({ success: false, error });
  }
};

export const hasUserCompletedChallenge = async (userId, challengeId) => {
  try {
    const { data, error } = await supabase
      .from('challenge_completions')
      .select()
      .eq('user_id', userId)
      .eq('challenge_id', challengeId);

    if (error) {
      console.error('Error checking completion:', error);
      return false;
    }

    return data.length > 0;
  } catch (error) {
    console.error('Error checking completion:', error);
    return false;
  }
};
