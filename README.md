# Gen AI News Plugin

A Chrome browser extension that provides weekly curated news about Generative AI. The plugin leverages NewsAPI to fetch relevant articles.

## Features

- Fetches latest Generative AI news articles using NewsAPI
- Weekly updates to keep you informed about Gen AI developments
- Easy-to-use Chrome browser extension interface
- ELI5 (Explain Like I'm Five) feature for each article using OpenAI

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
   - Sign up for [OpenAI](https://platform.openai.com/) to get your API key

2. Setup configuration:
   - Copy `config.template.js` to `config.js`
   - Add your NewsAPI and OpenAI keys to `config.js`
   - Note: `config.js` is gitignored to protect your API keys

## Usage

1. Click on the extension icon in your Chrome toolbar
2. View the latest Gen AI news summaries
3. Click on any article to read the full content

## Technologies Used

- JavaScript
- Chrome Extensions API
- NewsAPI

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Future Work
- Add a feature to generate summaries as to explain it to five year oldusing OpenAI, Gemini, or Claude. 
