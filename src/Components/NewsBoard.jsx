import React, { useState, useEffect } from "react";
import NewsContent from "./NewsContent";

const NewsBoard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
          import.meta.env.VITE_API_KEY
        }`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error searching for news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      {articles.map((news, index) => (
        <NewsContent
          key={index}
          title={news.title}
          description={news.description}
          src={news.urlToImage}
          url={news.url}
        />
      ))}
    </div>
  );
};

export default NewsBoard;
