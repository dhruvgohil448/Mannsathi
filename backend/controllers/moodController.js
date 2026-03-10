import userModel from "../models/userModel.js";

// Log Daily Mood
const logMood = async (req, res) => {
    const { emoji, notes, intensity } = req.body;
    const userId = req.user.id;

    try {
        // console.log("Request Body: ", req.body);
        
        const { moodData } = req.body;

        // console.log("Mood Data Backend: ", req.body.moodData);


        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const currentDate = new Date().toISOString().split("T")[0]; // Get today's date

        // Check if today's mood is already logged
        const alreadyLogged = user.moodData.find((mood) => mood.date === currentDate);
        if (alreadyLogged) {
            return res.json({ success: false, message: "Today's mood already logged!" });
        }

        // Push new mood object into array
        // user.moodData.push({
        //     date: currentDate,
        //     emoji,
        //     notes,
        //     moodIntensity: intensity
        // });
        if (Array.isArray(moodData)) {
            user.moodData = [...user.moodData, ...moodData]; // This will merge arrays
          } else {
            user.moodData.push(moodData);
        }

        await user.save();
        res.json({ success: true, message: "Mood logged successfully!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while logging mood" });
    }
};

// Fetch All Mood Entries for Personalized Suggestions
const getTodaysMood = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from URL
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentDate = new Date().toISOString().split("T")[0]; // Get today's date
        const todaysMood = user.moodData.find(mood => mood.date === currentDate);

        if (!todaysMood) {
            return res.status(404).json({ message: "No mood logged for today" });
        }

        res.status(200).json(todaysMood);  

    } catch (error) {
        res.status(500).json({ message: "Error fetching today's mood", error });
    }
};


// Fetch Weekly Mood Data
const getWeeklyMood = async (req, res) => {
    const userId = req.user.id; // Extracted from JWT Middleware
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const moodLogs = user.moodData;
        const last7Days = Object.keys(moodLogs)
            .slice(-7) // Last 7 Entries
            .map((date) => ({ date, ...moodLogs[date] }));

        res.json({ success: true, data: last7Days });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while fetching mood data" });
    }
};

export { logMood, getTodaysMood, getWeeklyMood };
