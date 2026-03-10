import userModel from "../models/userModel.js";

const saveAnswers = async (req, res) => {
//   console.log("API Hit"); // Add this
//   console.log(req.body);  // Check request body

  const { userId, answers } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentDate = new Date().toISOString().split("T")[0];

    // console.log("User answersData:", user.answersData);
    const alreadySaved = user.answersData.find((answer) => 
      answer.date.split("T")[0] === currentDate
    );

    if (alreadySaved) {
      return res.json({ success: false, message: "Today's answers already saved!" });
    }

    user.answersData.push({
      date: new Date().toISOString(), 
      answers: answers
    });

    await user.save();
    res.status(200).json({ success: true, message: "Answers saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAnswers = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.answersData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {saveAnswers, getAnswers};