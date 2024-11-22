import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import ArticleDetails from './ArticleDetails';

function Home({ onSearch, articles }) {
  return (
    <div>
      <h1>NY Times Article Search</h1>
      <SearchForm onSearch={onSearch} />
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <Link to={`/articles/${article._id}`}>{article.headline.main}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [articles, setArticles] = useState([]);

  // Fetch articles from backend
  const fetchArticles = async (query) => {
    const response = await fetch(`/api/articles?query=${query}`);
    const data = await response.json();
    setArticles(data.response.docs);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onSearch={fetchArticles} articles={articles} />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
