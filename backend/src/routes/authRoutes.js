const express = require('express');
const passport = require('passport');
const { register, login, googleCallback, getMe, updateMe } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { 
  failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=google_denied` 
}), googleCallback);

// Rotas protegidas
router.get('/me', authMiddleware, getMe);
router.patch('/me', authMiddleware, updateMe);

module.exports = router;