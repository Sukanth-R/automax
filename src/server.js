const express = require('express');
const translate = require('google-translate-api-x');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Enhanced translation endpoint with better error handling
app.post('/translate/batch', async (req, res) => {
  try {
    const { texts, from, to } = req.body;
    
    // Validate input
    if (!Array.isArray(texts) || !from || !to) {
      return res.status(400).json({ error: 'Invalid request format' });
    }

    // Process translations in parallel with error handling for each
    const translationPromises = texts.map(text => {
      return translate(String(text), { from, to })
        .then(result => result.text) // Extract just the translated text
        .catch(err => {
          console.error('Error translating text:', text, err);
          return String(text); // Return original text if translation fails
        });
    });

    const translatedTexts = await Promise.all(translationPromises);
    
    res.json({ 
      success: true,
      translatedTexts 
    });
    
  } catch (error) {
    console.error('Batch translation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Translation failed',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Translation server running on http://localhost:${PORT}`);
});