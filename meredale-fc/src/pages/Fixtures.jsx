import { useState } from 'react';
import { useFixtures } from '../hooks/useFixtures';

export default function Fixtures() {
  const { fixtures, loading, error } = useFixtures();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Filter fixtures
  const upcomingFixtures = fixtures?.filter(f => !f.isComplete) || [];
  const pastResults = fixtures?.filter(f => f.isComplete) || [];

  // Group past results by month for organization
  const groupedResults = pastResults.reduce((groups, match) => {
    const date = new Date(match.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(match);
    return groups;
  }, {});

  // League table data (mock data - replace with real data later)
  const leagueTable = [
    { position: 1, team: 'City FC', played: 8, won: 6, drawn: 1, lost: 1, goalsFor: 18, goalsAgainst: 7, points: 19 },
    { position: 2, team: 'United', played: 8, won: 5, drawn: 2, lost: 1, goalsFor: 15, goalsAgainst: 8, points: 17 },
    { position: 3, team: 'Meredale FC', played: 8, won: 5, drawn: 1, lost: 2, goalsFor: 14, goalsAgainst: 9, points: 16 },
    { position: 4, team: 'Academy', played: 8, won: 4, drawn: 2, lost: 2, goalsFor: 12, goalsAgainst: 10, points: 14 },
    { position: 5, team: 'Rangers', played: 8, won: 3, drawn: 2, lost: 3, goalsFor: 10, goalsAgainst: 11, points: 11 },
    { position: 6, team: 'Storm', played: 8, won: 2, drawn: 1, lost: 5, goalsFor: 8, goalsAgainst: 15, points: 7 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red"></div>
          <p className="text-gray-500 mt-4">Loading fixtures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red">
          <p>Error loading fixtures: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy to-navy/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FIXTURES & RESULTS</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Stay up to date with all Meredale FC matches
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-2 font-semibold transition relative ${
                activeTab === 'upcoming'
                  ? 'text-red border-b-2 border-red'
                  : 'text-gray-500 hover:text-navy'
              }`}
            >
              Upcoming Matches
              {upcomingFixtures.length > 0 && (
                <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                  {upcomingFixtures.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`py-4 px-2 font-semibold transition relative ${
                activeTab === 'results'
                  ? 'text-red border-b-2 border-red'
                  : 'text-gray-500 hover:text-navy'
              }`}
            >
              Results
              {pastResults.length > 0 && (
                <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                  {pastResults.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`py-4 px-2 font-semibold transition relative ${
                activeTab === 'table'
                  ? 'text-red border-b-2 border-red'
                  : 'text-gray-500 hover:text-navy'
              }`}
            >
              League Table
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="py-12 bg-gray-50 min-h-[500px]">
        <div className="container mx-auto px-4">
          
          {/* Upcoming Matches Tab */}
          {activeTab === 'upcoming' && (
            <div>
              {upcomingFixtures.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg">
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-gray-500 text-lg">No upcoming fixtures scheduled.</p>
                  <p className="text-gray-400 mt-2">Check back soon for match updates!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingFixtures.map((fixture) => (
                    <div key={fixture._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                      <div className="p-6">
                        {/* Date and Competition */}
                        <div className="flex flex-wrap justify-between items-center mb-4 pb-3 border-b border-gray-100">
                          <div>
                            <p className="text-red font-bold text-lg">{fixture.date}</p>
                            <p className="text-gray-500 text-sm">{fixture.time || 'Time TBD'}</p>
                          </div>
                          <div>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              fixture.homeAway === 'Home' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {fixture.homeAway || 'Home'} Match
                            </span>
                            {fixture.competition && (
                              <span className="ml-2 inline-block px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                                {fixture.competition}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Match Details */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex-1 text-center md:text-left">
                            <p className="text-gray-500 text-sm">Opponent</p>
                            <p className="text-2xl font-bold text-navy">{fixture.opponent}</p>
                          </div>
                          <div className="text-center px-6">
                            <div className="text-4xl font-bold text-gray-300">VS</div>
                          </div>
                          <div className="flex-1 text-center md:text-right">
                            <p className="text-gray-500 text-sm">Location</p>
                            <p className="text-xl text-gray-700">{fixture.location || 'TBD'}</p>
                          </div>
                        </div>
                        
                        {/* Add to Calendar Button (Optional) */}
                        <div className="mt-6 pt-3 border-t border-gray-100 text-right">
                          <button className="text-sm text-gray-400 hover:text-red transition">
                            Add to Calendar +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <div>
              {pastResults.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-500 text-lg">No results available yet.</p>
                  <p className="text-gray-400 mt-2">Results will appear here after matches are played.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedResults).map(([monthYear, matches]) => (
                    <div key={monthYear}>
                      <h3 className="text-xl font-bold text-navy mb-4 pb-2 border-b-2 border-red inline-block">
                        {monthYear}
                      </h3>
                      <div className="space-y-3 mt-4">
                        {matches.map((match) => (
                          <div key={match._id} className="bg-white rounded-lg shadow p-5 hover:shadow-md transition">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              <div className="flex-1">
                                <p className="text-sm text-gray-500">{match.date}</p>
                                <p className="font-semibold text-gray-700">{match.competition || 'League Match'}</p>
                              </div>
                              <div className="flex-1 text-center">
                                <p className="text-lg font-bold text-navy">{match.opponent}</p>
                              </div>
                              <div className="flex-1 text-right">
                                <p className="text-2xl font-bold text-navy">{match.result}</p>
                                <p className="text-xs text-gray-400 mt-1">{match.location}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* League Table Tab */}
          {activeTab === 'table' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-navy text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Pos</th>
                      <th className="px-4 py-3 text-left">Team</th>
                      <th className="px-4 py-3 text-center">P</th>
                      <th className="px-4 py-3 text-center">W</th>
                      <th className="px-4 py-3 text-center">D</th>
                      <th className="px-4 py-3 text-center">L</th>
                      <th className="px-4 py-3 text-center">GF</th>
                      <th className="px-4 py-3 text-center">GA</th>
                      <th className="px-4 py-3 text-center">GD</th>
                      <th className="px-4 py-3 text-center font-bold">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leagueTable.map((team) => (
                      <tr 
                        key={team.position} 
                        className={`hover:bg-gray-50 transition ${
                          team.team === 'Meredale FC' ? 'bg-red/5 font-semibold' : ''
                        }`}
                      >
                        <td className="px-4 py-3 text-left">
                          <span className={`inline-block w-8 ${
                            team.position === 1 ? 'text-yellow-600 font-bold' : ''
                          }`}>
                            {team.position}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-left">
                          {team.team}
                          {team.team === 'Meredale FC' && (
                            <span className="ml-2 inline-block px-2 py-0.5 rounded-full text-xs bg-red text-white">
                              Our Club
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">{team.played}</td>
                        <td className="px-4 py-3 text-center">{team.won}</td>
                        <td className="px-4 py-3 text-center">{team.drawn}</td>
                        <td className="px-4 py-3 text-center">{team.lost}</td>
                        <td className="px-4 py-3 text-center">{team.goalsFor}</td>
                        <td className="px-4 py-3 text-center">{team.goalsAgainst}</td>
                        <td className="px-4 py-3 text-center">{team.goalsFor - team.goalsAgainst}</td>
                        <td className="px-4 py-3 text-center font-bold text-navy">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-6 py-4 text-sm text-gray-500">
                <p>Table shows current league standings. Last updated: March 2026</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}