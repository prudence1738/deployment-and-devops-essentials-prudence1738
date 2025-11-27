require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');
const Sentry = require('@sentry/node');

const app = express();
const PORT = process.env.PORT || 5000;

// Init Sentry (optional)
if (process.env.SENTRY_DSN) {
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  app.use(Sentry.Handlers.requestHandler());
}

// Logger (winston)
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [new winston.transports.Console()]
});

// DB connection (with pool size)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10
}).then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error', err));

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined')); // HTTP request logging

// Simple message model
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 500 },
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', timestamp: Date.now() }));

// API routes
app.get('/api/messages', async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(100);
    res.json(messages);
  } catch (err) { next(err); }
});

app.post('/api/messages', async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ message: 'Message text required' });
    const msg = new Message({ text: text.trim() });
    await msg.save();
    res.status(201).json(msg);
  } catch (err) { next(err); }
});

// Sentry error handler (if used)
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Central error handler
app.use((err, req, res, next) => {
  logger.error(err.stack || err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
