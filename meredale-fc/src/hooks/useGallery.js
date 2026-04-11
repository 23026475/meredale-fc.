import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export function useGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const query = `*[_type == "gallery"] | order(date desc) {
          _id,
          image,
          caption,
          category,
          date
        }`;
        
        const data = await client.fetch(query);
        setImages(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    
    fetchGallery();
  }, []);

  return { images, loading, error };
}