import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { logger } from './utils/logger';
import { errorHandler } from './middlewares/errorHandler';
import { createPlan } from './controllers/planController';

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST']
}));
app.use(express.json({ limit: '10kb' })); // Body parser

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', apiLimiter);

// Routes
const router = express.Router();
router.post('/generate-plan', createPlan);
app.use('/api', router);

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'healthy' }));

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});