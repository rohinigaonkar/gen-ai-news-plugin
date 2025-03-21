# Gen AI News Plugin with ELI5 Feature

A Chrome browser extension that provides weekly curated news about Generative AI, with an "Explain Like I'm Five" feature powered by Google's Gemini AI.

## Features

- Fetches latest Generative AI news articles using NewsAPI
- ELI5 (Explain Like I'm Five) button for each article, explains complex tech news in simple terms using Google's Gemini Flash 2.0
- Weekly updates to keep you informed about Gen AI developments
- Easy-to-use Chrome browser extension interface

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/rohinigaonkar/gen-ai-news-plugin.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the extension directory

## Configuration

1. Get your API keys:
   - Sign up for [NewsAPI](https://newsapi.org/) to get your API key
   - Get your [Google AI Studio](https://makersuite.google.com/app/apikey) API key for Gemini

2. Setup configuration:
   - Copy `config.template.js` to `config.js`
   - Add your NewsAPI and Gemini API keys to `config.js`
   - Note: `config.js` is gitignored to protect your API keys

## AI Response Configuration

The extension uses Google's Gemini Flash 2.0 model with the following parameters for optimal ELI5 responses:

- **Temperature (0.7)**: Controls response creativity
  - Range: 0.0 (focused) to 1.0 (creative)
  - 0.7 provides a good balance between consistency and creativity

- **Top P (0.8)**: Controls response diversity
  - Range: 0.0 to 1.0
  - 0.8 means considering tokens in the top 80% probability mass

- **Top K (40)**: Controls vocabulary range
  - Considers the 40 most likely next words
  - Balances between focused and diverse responses

- **Max Output Tokens (200)**: Limits response length
  - Approximately 150-200 words
  - Ensures concise, child-friendly explanations

## Usage

1. Click on the extension icon in your Chrome toolbar
2. Browse through the latest Gen AI news
3. Click the "Explain Like I'm Five" button under any article to get a simplified explanation
4. Click on any article title to read the full content

## Technologies Used

- JavaScript
- Chrome Extensions API
- NewsAPI
- Google Gemini Flash 2.0 API
- HTML/CSS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Security Note

Never commit your `config.js` file to the repository as it contains sensitive API keys. The template file (`config.template.js`) is provided for reference.

