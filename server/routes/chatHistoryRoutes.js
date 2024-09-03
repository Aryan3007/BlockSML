import express from 'express';
import { createQuestionResponse, getChatHistory } from '../controllers/chatHistoryController.js';

const router = express.Router();

// Route to handle fetching chat history
router.post('/chat_history', createQuestionResponse);
router.get('/chat_history', getChatHistory);


export default router;
