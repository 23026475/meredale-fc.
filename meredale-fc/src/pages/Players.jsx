import { usePlayers } from '../hooks/usePlayers';
import { urlFor } from '../lib/sanity';

export default function Players() {
  const { players, loading, error } = usePlayers();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-navy text-xl">Loading players...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red text-xl">Error loading players: {error.message}</div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-navy text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">FIRST TEAM SQUAD</h1>
          <p className="text-xl">Meet the players representing Meredale FC</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {players.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>No players added yet. Go to Sanity Studio to add some!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {players.map((player) => (
                <div key={player._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  {player.photo && (
                    <div className="h-64 overflow-hidden bg-gray-200">
                      <img 
                        src={urlFor(player.photo).width(400).height(400).url()} 
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-navy">{player.name}</h3>
                      <span className="bg-red text-white px-3 py-1 rounded-full text-sm font-bold">
                        #{player.number}
                      </span>
                    </div>
                    <p className="text-gray-600 font-semibold mb-3">{player.position}</p>
                    {player.age && <p className="text-gray-500 mb-4">{player.age} years old</p>}
                    <div className="flex gap-4 mb-4">
                      <div className="bg-gray-100 px-3 py-1 rounded-lg text-center">
                        <p className="text-2xl font-bold text-red">{player.goals || 0}</p>
                        <p className="text-xs text-gray-600">Goals</p>
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-lg text-center">
                        <p className="text-2xl font-bold text-red">{player.assists || 0}</p>
                        <p className="text-xs text-gray-600">Assists</p>
                      </div>
                    </div>
                    {player.bio && (
                      <p className="text-gray-600 text-sm line-clamp-3">{player.bio}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}