import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const query = `*[_type == "news"] | order(date desc) {
          _id,
          title,
          slug,
          date,
          excerpt,
          category,
          featuredImage
        }[0...6]`;
        
        const data = await client.fetch(query);
        setNews(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    
    fetchNews();
  }, []);

  return { news, loading, error };
}