import config from './config.js';

const NEWS_API_KEY = config.NEWS_API_KEY;
const NEWS_API_ENDPOINT = 'https://newsapi.org/v2/everything';
const NEWS_PER_PAGE = 3;
let currentPage = 1;
let allNews = [];

// Add new constants for OpenAI
const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

document.addEventListener('DOMContentLoaded', function() {
  // Load and display news
  loadNews();

  // Add to DOMContentLoaded event listener
  document.getElementById('closeBtn').addEventListener('click', () => {
    window.close();
  });
});

function loadNews() {
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = '<div class="loading">Loading your simple news...</div>';

  fetchTopGenAINews()
    .then(news => {
      allNews = news;
      displayNewsPage(1);
      setupPagination();
    })
    .catch(error => {
      newsContainer.innerHTML = `<div class="error">Error loading news: ${error.message}</div>`;
    });
}

async function fetchAvailableSources() {
  const params = new URLSearchParams({
    category: 'technology',
    language: 'en',
    apiKey: NEWS_API_KEY
  });

  const response = await fetch(`https://newsapi.org/v2/top-headlines/sources?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch sources');
  }

  return data.sources;
}

async function fetchTopGenAINews() {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const params = new URLSearchParams({
    q: '(generative AI OR artificial intelligence) AND (gpt OR llm OR stable diffusion OR chatgpt)',
    domains: 'techcrunch.com,wired.com,theverge.com,venturebeat.com,thenextweb.com,zdnet.com,engadget.com,arstechnica.com',
    from: lastWeek.toISOString().split('T')[0],
    to: today.toISOString().split('T')[0],
    sortBy: 'relevancy',
    language: 'en',
    pageSize: 9,
    apiKey: NEWS_API_KEY
  });

  const response = await fetch(`${NEWS_API_ENDPOINT}?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch news');
  }

  if (!data.articles || data.articles.length === 0) {
    throw new Error('No news found for the past week');
  }

  return data.articles.map(article => ({
    title: article.title,
    url: article.url,
    date: new Date(article.publishedAt),
    explanation: article.description || 'No description available'
  }));
}

function displayNewsPage(page) {
  currentPage = page;
  const start = (page - 1) * NEWS_PER_PAGE;
  const end = start + NEWS_PER_PAGE;
  const newsToShow = allNews.slice(start, end);

  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = '';

  newsToShow.forEach(item => {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
      <a href="${item.url}" target="_blank" class="news-title">${item.title}</a>
      <div class="news-date">${item.date.toLocaleDateString()}</div>
      <div class="simple-explanation">${item.explanation}</div>
    `;
    newsContainer.appendChild(newsItem);
  });

  // Call setupELI5Feature after displaying news items
  setupELI5Feature();
}

function setupPagination() {
  const totalPages = Math.ceil(allNews.length / NEWS_PER_PAGE);
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination';

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.className = `page-btn ${i === currentPage ? 'active' : ''}`;
    pageButton.textContent = i;
    pageButton.onclick = () => {
      displayNewsPage(i);
      updatePaginationActive(i);
    };
    paginationContainer.appendChild(pageButton);
  }

  document.querySelector('.container').appendChild(paginationContainer);
}

function updatePaginationActive(page) {
  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.classList.remove('active');
    if (parseInt(btn.textContent) === page) {
      btn.classList.add('active');
    }
  });
}

function setupELI5Feature() {
  const newsContainer = document.getElementById('newsContainer');
  
  // Add ELI5 input section to each news item
  document.querySelectorAll('.news-item').forEach(item => {
    const eli5Section = document.createElement('div');
    eli5Section.className = 'eli5-section';
    eli5Section.innerHTML = `
      <button class="eli5-btn">Explain Like I'm Five</button>
      <div class="eli5-explanation hidden"></div>
    `;
    
    const eli5Btn = eli5Section.querySelector('.eli5-btn');
    const eli5Explanation = eli5Section.querySelector('.eli5-explanation');
    
    eli5Btn.addEventListener('click', async () => {
      const url = item.querySelector('a').href;
      const title = item.querySelector('a').textContent;
      const description = item.querySelector('.simple-explanation').textContent;
      
      eli5Btn.disabled = true;
      eli5Btn.textContent = 'Generating explanation...';
      eli5Explanation.textContent = 'Loading...';
      eli5Explanation.classList.remove('hidden');
      
      try {
        const explanation = await getELI5Explanation(title, description);
        eli5Explanation.textContent = explanation;
      } catch (error) {
        eli5Explanation.textContent = `Error: ${error.message}`;
      } finally {
        eli5Btn.disabled = false;
        eli5Btn.textContent = "Explain Like I'm Five";
      }
    });
    
    item.appendChild(eli5Section);
  });
}

async function getELI5Explanation(title, description) {
  const prompt = `Please explain this tech news in simple terms that a 5-year-old would understand:\n\nTitle: ${title}\n\nDescription: ${description}`;
  
  try {
    const response = await fetch(OPENAI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that explains complex tech news to 5-year-olds."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get explanation');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`OpenAI API Error: ${error.message}`);
  }
} 