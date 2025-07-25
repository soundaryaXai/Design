import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import userRoutes from './routes/user';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://design-lyart-kappa.vercel.app', 'https://design-bomj.onrender.com'] // Allow requests from your Vercel and Render frontends
}));
app.use(express.json());




const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI environment variable is not set. Please check your .env file.');
}

console.log('MongoDB URI:', MONGO_URI);
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Micro Volunteer Platform API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
