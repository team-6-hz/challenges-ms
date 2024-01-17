import cors from 'cors';
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: './/.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
// Mock data (replace with database)
const challenges = [
    [
        { id: 1, description: 'Take 10 minutes to catch your breath and reset.' },
        { id: 2, description: 'Write down three moments that made your day a bit brighter.' },
        { id: 3, description: 'Step away from screens for an hour; embrace your own company.' },
        { id: 4, description: 'Dive into calming melodies for 15 minutes; let the music guide you.' },
        { id: 5, description: 'Take 5 minutes to practice gentle breathing; find peace in each breath.' },
        { id: 6, description: 'Craft a list of affirmations; let the words become your shield.' },
        { id: 7, description: 'Sneak in a quick desk stretch; release tension and rejuvenate.' },
        { id: 8, description: 'Rediscover or explore a hobby for 20 minutes; let passion guide you.' },
        { id: 9, description: 'Embrace an evening without technology; revel in the analog world.' },
        { id: 10, description: 'Write a letter to yourself, acknowledging and celebrating a recent triumph.' },
        { id: 11, description: 'Indulge in a soothing bath or shower; let the warmth wash away stress.' },
        { id: 12, description: 'Arrange a virtual coffee date; connect with a friend or family member.' },
        { id: 13, description: 'Carve out 30 minutes to declutter your space; create calm amid chaos.' },
        { id: 14, description: 'Practice muscle relaxation for 10 minutes; let go of tension.' },
        { id: 15, description: 'Express yourself through creativity; paint, draw, or write without boundaries.' },
        { id: 16, description: 'Take a gentle stroll in nature; let the outdoors ease your mind.' },
        { id: 17, description: 'Challenge uncertainty by noting positive affirmations; shift your perspective.' },
        { id: 18, description: 'Organize a small area in your living space; find order in simplicity.' },
        { id: 19, description: 'Squeeze in a quick workout or stretch; invigorate your body.' },
        { id: 20, description: 'Set achievable goals for the day; celebrate progress, big or small.' },
        { id: 21, description: 'Sit in silence for 10 minutes; let your thoughts settle like autumn leaves.' },
        { id: 22, description: 'List five things you appreciate about yourself today; build self-compassion.' },
        { id: 23, description: 'Disconnect from the digital world; embrace the simplicity of the moment.' },
        { id: 24, description: 'Immerse yourself in instrumental tunes; let the melodies tell your story.' },
        { id: 25, description: 'Engage in mindful breathing; find tranquility in the rise and fall of each breath.' },
        { id: 26, description: 'Create a pocket-sized positivity list; carry it as a reminder of your strength.' },
        { id: 27, description: 'Stretch at your workspace; let each movement be a break for your soul.' },
        { id: 28, description: 'Explore a hobby, old or new; let passion be your compass in the journey.' },
        { id: 29, description: 'Savor an evening without technology; rediscover the joy of simple pleasures.' },
        { id: 30, description: 'Pen a letter to your future self; envision the growth yet to come.' },
        { id: 31, description: 'Bathe in tranquility; let the water wash away the worries of the day.' },
        { id: 32, description: 'Host a virtual gathering; share laughter and connection from afar.' },
        { id: 33, description: 'Tidy your space for half an hour; let order bring a sense of calm.' },
        { id: 34, description: 'Practice muscle relaxation; allow your body to release built-up tension.' },
        { id: 35, description: 'Express yourself creatively; let your inner artist paint the canvas of your emotions.' },
        { id: 36, description: 'Embark on a leisurely outdoor stroll; let nature her whispers soothe your spirit.' },
        { id: 37, description: 'Counter uncertainty with positive affirmations; let optimism guide your thoughts.' },
        { id: 38, description: 'Reorganize a small corner of your space; find joy in simplicity.' },
        { id: 39, description: 'Engage in a brief workout or stretch; let movement be a celebration of your body.' },
        { id: 40, description: 'Set intentions for the day; let each goal be a step toward a fulfilling journey.' }
      ]
    ]
  
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
  }

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
          
          const challenge = flatChallenges.find(ch => ch.id === challengeId);
      
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
      