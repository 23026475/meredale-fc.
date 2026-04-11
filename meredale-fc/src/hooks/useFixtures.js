import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export function useFixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFixtures() {
      try {
        const query = `*[_type == "fixture"] | order(date asc) {
          _id,
          date,
          opponent,
          competition,
          location,
          homeAway,
          time,
          result,
          isComplete
        }`;
        
        const data = await client.fetch(query);
        setFixtures(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    
    fetchFixtures();
  }, []);

  return { fixtures, loading, error };
}