import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const query = `*[_type == "player" && _id == $id][0] {
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
        
        const data = await client.fetch(query, { id });
        setPlayer(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    
    fetchPlayer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading player details...</p>
        </div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red text-lg">Player not found</p>
          <Link to="/team" className="text-red hover:underline mt-4 inline-block">
            Back to Team
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Floating Back Button */}
      <Link
        to="/team"
        className="fixed top-24 left-4 z-50 bg-navy text-white p-3 rounded-full shadow-lg hover:bg-red transition duration-300 group"
        aria-label="Back to Team"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy to-navy/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{player.name}</h1>
          <p className="text-xl">{player.position}</p>
        </div>
      </section>

      {/* Player Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Player Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl">
                {player.photo ? (
                  <img
                    src={urlFor(player.photo).width(600).height(600).url()}
                    alt={player.name}
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                    <span className="text-8xl">⚽</span>
                  </div>
                )}
              </div>

              {/* Player Stats */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-red text-white px-4 py-2 rounded-full text-2xl font-bold">
                      #{player.number}
                    </span>
                    <span className="text-gray-500 text-lg">{player.position}</span>
                  </div>
                  
                  {player.age && (
                    <p className="text-gray-600 mb-2">
                      <strong className="text-navy">Age:</strong> {player.age}
                    </p>
                  )}
                </div>

                {/* Season Stats */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-navy mb-4">Season Statistics</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-red">{player.goals || 0}</p>
                      <p className="text-gray-600">Goals</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold text-red">{player.assists || 0}</p>
                      <p className="text-gray-600">Assists</p>
                    </div>
                  </div>
                </div>

                {/* Biography */}
                {player.bio && (
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-3">About {player.name}</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {player.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}