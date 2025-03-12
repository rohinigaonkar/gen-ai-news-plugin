# Gen AI News Plugin

A Chrome browser extension that provides weekly curated news about Generative AI. The plugin leverages NewsAPI to fetch relevant articles.

## Features

- Fetches latest Generative AI news articles using NewsAPI
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

1. Get your API key:
   - Sign up for [NewsAPI](https://newsapi.org/) to get your API key

2. Setup configuration:
   - Copy `config.template.js` to `config.js`
   - Add your NewsAPI key to `config.js`
   - Note: `config.js` is gitignored to protect your API keys

## Usage

1. Click on the extension icon in your Chrome toolbar
2. View the latest Gen AI news summaries
3. Click on any article to read the full content

## Tools & Technologies Used

- [Cursor, AI Code editor](https://www.cursor.com/)
- [Google Chrome Extensions API](https://developer.chrome.com/)
- [NewsAPI](https://newsapi.org/)
- JavaScript

## Future Work
- Add a feature to generate summaries as to explain it to five year old using OpenAI, Gemini, or Claude. Branch ELIF has all the code for this, need a paid OpenAI key to run it.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
