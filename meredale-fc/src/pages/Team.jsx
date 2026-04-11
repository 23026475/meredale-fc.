import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlayers } from '../hooks/usePlayers';
import { useStaff } from '../hooks/useStaff';
import { urlFor } from '../lib/sanity';

export default function Team() {
  const { players, loading: playersLoading } = usePlayers();
  const { staff, loading: staffLoading } = useStaff();
  const [activeTab, setActiveTab] = useState('squad');

  // Group players by position
  const goalkeepers = players?.filter(p => p.position === 'Goalkeeper') || [];
  const defenders = players?.filter(p => p.position === 'Defender') || [];
  const midfielders = players?.filter(p => p.position === 'Midfielder') || [];
  const forwards = players?.filter(p => p.position === 'Forward') || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy to-navy/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FIRST TEAM</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Meet the players and coaching staff of Meredale FC
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('squad')}
              className={`py-4 px-2 font-semibold transition relative ${
                activeTab === 'squad'
                  ? 'text-red border-b-2 border-red'
                  : 'text-gray-500 hover:text-navy'
              }`}
            >
              The Squad
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`py-4 px-2 font-semibold transition relative ${
                activeTab === 'staff'
                  ? 'text-red border-b-2 border-red'
                  : 'text-gray-500 hover:text-navy'
              }`}
            >
              Coaching Staff
            </button>
          </div>
        </div>
      </div>

      {/* Squad Tab - Field Layout */}
      {activeTab === 'squad' && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {playersLoading ? (
              <div className="text-center py-12">
                <div className="spinner mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading players...</p>
              </div>
            ) : players?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No players added yet. Check back soon!</p>
              </div>
            ) : (
              <>
                {/* Soccer Field Diagram */}
                <div className="relative bg-green-700 rounded-2xl overflow-hidden shadow-xl mb-12">
                  {/* Field Lines */}
                  <div className="absolute inset-0 border-4 border-white/30 rounded-2xl"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 -translate-x-1/2"></div>
                  <div className="absolute left-1/2 top-1/2 w-32 h-32 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-1/2 w-48 h-32 border-2 border-white/30 -translate-x-1/2 rounded-t-full"></div>
                  
                  {/* Field Content */}
                  <div className="relative z-10 py-8">
                    {/* Goalkeepers */}
                    {goalkeepers.length > 0 && (
                      <div className="mb-12">
                        <h3 className="text-center text-white font-bold mb-4 text-lg tracking-wider">GOALKEEPERS</h3>
                        <div className="flex justify-center gap-6 flex-wrap">
                          {goalkeepers.map((player) => (
                            <PlayerCard key={player._id} player={player} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Defenders */}
                    {defenders.length > 0 && (
                      <div className="mb-12">
                        <h3 className="text-center text-white font-bold mb-4 text-lg tracking-wider">DEFENDERS</h3>
                        <div className="flex justify-center gap-6 flex-wrap max-w-3xl mx-auto">
                          {defenders.map((player) => (
                            <PlayerCard key={player._id} player={player} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Midfielders */}
                    {midfielders.length > 0 && (
                      <div className="mb-12">
                        <h3 className="text-center text-white font-bold mb-4 text-lg tracking-wider">MIDFIELDERS</h3>
                        <div className="flex justify-center gap-6 flex-wrap max-w-4xl mx-auto">
                          {midfielders.map((player) => (
                            <PlayerCard key={player._id} player={player} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Forwards */}
                    {forwards.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-center text-white font-bold mb-4 text-lg tracking-wider">FORWARDS</h3>
                        <div className="flex justify-center gap-6 flex-wrap max-w-3xl mx-auto">
                          {forwards.map((player) => (
                            <PlayerCard key={player._id} player={player} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Full Squad List (Alternative View) */}
                <div className="bg-white rounded-2xl p-8 shadow-md">
                  <h3 className="text-2xl font-bold text-navy mb-6 text-center">FULL SQUAD LIST</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 text-navy">#</th>
                          <th className="text-left py-3 px-4 text-navy">Player</th>
                          <th className="text-left py-3 px-4 text-navy">Position</th>
                          <th className="text-left py-3 px-4 text-navy">Age</th>
                          <th className="text-left py-3 px-4 text-navy"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {players.map((player) => (
                          <tr key={player._id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-bold text-red">{player.number}</td>
                            <td className="py-3 px-4 font-semibold text-navy">{player.name}</td>
                            <td className="py-3 px-4 text-gray-600">{player.position}</td>
                            <td className="py-3 px-4 text-gray-600">{player.age || '-'}</td>
                            <td className="py-3 px-4">
                              <Link
                                to={`/players/${player._id}`}
                                className="text-red hover:text-navy text-sm font-semibold"
                              >
                                View Bio →
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Staff Tab */}
      {activeTab === 'staff' && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {staffLoading ? (
              <div className="text-center py-12">
                <div className="spinner mx-auto"></div>
                <p className="text-gray-500 mt-4">Loading coaching staff...</p>
              </div>
            ) : staff?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No coaching staff added yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {staff.map((member) => (
                  <div key={member._id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                    <div className="bg-navy h-32 flex items-center justify-center">
                      {member.photo ? (
                        <img
                          src={urlFor(member.photo).width(150).height(150).url()}
                          alt={member.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-white"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-4xl">👨‍🏫</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-navy mb-1">{member.name}</h3>
                      <p className="text-red font-semibold mb-3">{member.role}</p>
                      {member.bio && (
                        <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-gray-400 text-sm hover:text-red">
                          {member.email}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Player Card Component
function PlayerCard({ player }) {
  return (
    <Link to={`/players/${player._id}`} className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition w-40 text-center">
        <div className="relative">
          {player.photo ? (
            <img
              src={urlFor(player.photo).width(160).height(160).url()}
              alt={player.name}
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-4xl">⚽</span>
            </div>
          )}
          <div className="absolute top-2 left-2 bg-red text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            {player.number}
          </div>
        </div>
        <div className="p-3">
          <h4 className="font-bold text-navy text-sm">{player.name}</h4>
          <p className="text-gray-500 text-xs">{player.position}</p>
          <button className="mt-2 bg-red text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-navy transition w-full">
            View Bio
          </button>
        </div>
      </div>
    </Link>
  );
}