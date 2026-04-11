import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export function usePlayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const query = `*[_type == "player"] | order(number asc) {
          _id,
          name,
          number,
          position,
          age,
          photo,
          goals,
          assists,
          bio,
          featured
        }`;
        
        const data = await client.fetch(query);
        setPlayers(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    
    fetchPlayers();
  }, []);

  return { players, loading, error };
}