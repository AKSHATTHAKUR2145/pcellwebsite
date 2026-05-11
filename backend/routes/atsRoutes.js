const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/atsController');

const router = express.Router();

// Multer setup for temporary file storage
const upload = multer({ dest: 'uploads/' });

// POST route where frontend will send the PDF and Role
router.post('/analyze', upload.single('resume'), analyzeResume);

module.exports = router;