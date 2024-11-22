import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await fetch(`/api/articles/${id}`);
      const data = await response.json();
      setArticle(data);
    };
    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.headline.main}</h1>
      <p><strong>Source:</strong> {article.source}</p>
      <p><strong>Published Date:</strong> {article.pub_date}</p>
      <p><strong>Abstract:</strong> {article.abstract}</p>
      <p><strong>Lead Paragraph:</strong> {article.lead_paragraph}</p>
      <a href={article.web_url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
    </div>
  );
}

export default ArticleDetails;
