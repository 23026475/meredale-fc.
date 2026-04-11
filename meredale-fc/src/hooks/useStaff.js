import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export function useStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStaff() {
      try {
        const query = `*[_type == "staff"] | order(name asc) {
          _id,
          name,
          role,
          photo,
          bio,
          email
        }`;
        
        const data = await client.fetch(query);
        setStaff(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    
    fetchStaff();
  }, []);

  return { staff, loading, error };
}