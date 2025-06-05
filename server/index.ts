import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import casesRouter from './routes/cases';
import tokensRouter from './routes/tokens';

// Load environment variables from the correct path
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cases', casesRouter);
app.use('/api/tokens', tokensRouter);

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 