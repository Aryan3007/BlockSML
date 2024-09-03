import Question from "../models/ChatHistory.js";

// Controller to handle the creation of a new question-response entry
export const createQuestionResponse = async (req, res) => {
  try {
    const { question, response } = req.body;

    // Validate the request payload
    if (!question || !response) {
      return res.status(400).json({ message: 'Question and response are required.' });
    }

    // Create a new question-response document
    const newQuestionResponse = new Question({
      question,
      response,
    });

    // Save the document to the database
    const savedQuestionResponse = await newQuestionResponse.save();

    // Respond with the saved document
    return res.status(201).json(savedQuestionResponse);
  } catch (error) {
    // Handle any errors that occur
    return res.status(500).json({ message: 'Server error. Please try again later.', error: error.message });
  }
};



export const getChatHistory = async (req, res) => {
  try {
    // Fetch all chat history entries from the database
    const chatHistories = await Question.find({}).sort({ createdAt: -1 });

    // Format the response
    const formattedResponse = chatHistories.map(entry => ({
      question: entry.question,
      response: entry.response,
      thread_id: entry._id, // Assuming _id is used as thread_id
      time: entry.createdAt.toUTCString() // Formatting the date to a readable string
    }));

    res.json({
      response: formattedResponse,
      status: true
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({
      response: [],
      status: false,
      message: 'Server error',
    });
  }
};

