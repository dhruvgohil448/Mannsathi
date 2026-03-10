
import axios from 'axios';

const suggestionMap = {
  "Needs Motivation": [
    "Try watching a motivational video or taking a walk. It can help reset your mood.",
    "Set a small goal and crush it—anything, like organizing your workspace.",
    "Write down three things you're grateful for to shift your mindset.",
    "Call someone you admire for a quick chat or advice.",
    "Do a 10-minute workout to get your blood flowing and energy up."
  ],
  "Celebrate Positive Mood": [
    "You're doing great! Reflect on what made you feel this way and repeat it.",
    "Treat yourself to something small that you enjoy, like your favorite snack or activity.",
    "Share your happiness with others, it can amplify your joy!",
    "Take a moment to plan your next step while feeling confident.",
    "Write a quick journal entry about what's working for you right now."
  ],
  "Promote Self-Care": [
    "Self-care is important. Take a break, hydrate, and maybe talk to someone.",
    "Consider a warm bath or a soothing skincare routine.",
    "Do some deep breathing exercises or meditate for 5-10 minutes.",
    "Disconnect from your screen for a while and enjoy a book or nature.",
    "Practice a hobby you enjoy, like drawing, knitting, or cooking."
  ],
  "Encourage Social Interaction": [
    "Reach out to a friend or join a group activity—it'll lift your mood.",
    "Join an online community or take part in a virtual event.",
    "Send a thoughtful message to someone you care about, just to check in.",
    "Invite a friend to a virtual coffee catch-up or chat.",
    "Consider volunteering or offering help to others—it can brighten your day."
  ],
  "Recommend Relaxation": [
    "Your mind needs a break. Try music, a nap, or some quiet time.",
    "Try a guided meditation or yoga session to calm your mind.",
    "Watch a movie or TV show you love, something lighthearted.",
    "Practice some gentle stretching to release tension in your body.",
    "Unwind with a puzzle, painting, or any creative, low-pressure activity."
  ],
  "Recover from Burnout": [
    "Take a break and let yourself rest. You deserve it!",
    "Consider taking a mental health day to recharge.",
    "Reflect on what led to burnout and make small changes for balance.",
    "Start with small, manageable tasks and gradually increase your energy.",
    "Talk to someone you trust about how you’re feeling. You don’t have to go through it alone."
  ],
  "Handle Loneliness": [
    "Consider reaching out to a friend for a chat or support.",
    "Try to find a hobby or activity that you enjoy doing alone.",
    "Talk to your parents or guardians share with them your problems",
    "Take time to reflect on what makes you feel fulfilled, even alone.",
    "Reach out to a mental health professional if loneliness is affecting you."
  ],
  "Angry": [
    "Take a few deep breaths to calm down and reset your mind.",
    "Engage in physical activity to release tension and frustration.",
    "Talk to someone you trust about what's making you angry.",
    "Take a break and step away from whatever is causing irritation.",
    "Practice mindfulness or relaxation exercises to let go of the anger."
  ],
  "Tired": [
    "Take a nap to recharge your energy and clear your mind.",
    "Drink some water and eat something healthy to boost your energy.",
    "Do a light stretch to help relieve physical tension.",
    "Listen to calming music or a podcast to help you relax.",
    "Consider creating a bedtime routine to improve sleep quality."
  ]
};

  
export const getSuggestion = async (req, res) => {
  try {
    const { emoji, sleepQuality, metFriends, productivity, tookBreaks, overallFeeling, notes } = req.body;

    const response = await axios.post('http://localhost:5000/predict', {
      emoji,
      sleepQuality,
      metFriends,
      productivity,
      tookBreaks,
      overallFeeling,
      notes
    });

    const label = response.data.label;
    const suggestion = suggestionMap[label] || "Keep taking care of yourself!";

    res.json({ suggestion });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
