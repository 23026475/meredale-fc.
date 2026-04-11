import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export function useSponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const query = `*[_type == "sponsor" && active == true] | order(tier asc) {
          _id,
          name,
          logo,
          website,
          description,
          tier
        }`;
        
        const data = await client.fetch(query);
        setSponsors(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    
    fetchSponsors();
  }, []);

  return { sponsors, loading, error };
}