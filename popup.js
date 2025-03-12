import config from './config.js';

const NEWS_API_KEY = config.NEWS_API_KEY;
const NEWS_API_ENDPOINT = 'https://newsapi.org/v2/everything';
const NEWS_PER_PAGE = 3;
let currentPage = 1;
let allNews = [];

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