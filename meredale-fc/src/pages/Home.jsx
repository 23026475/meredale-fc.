import { Link } from 'react-router-dom';

export default function Home() {
  const matches = [
    { date: 'Sat Oct 14', opponent: 'City FC', time: '3:00 PM', location: 'Home Field' },
    { date: 'Sun Oct 15', opponent: 'United', time: '10:00 AM', location: 'Away' },
    { date: 'Sat Oct 21', opponent: 'Academy', time: '2:30 PM', location: 'Home Field' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">MEREDALE FC</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Building community through soccer. Support your local club.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/donate" className="bg-red text-white px-8 py-3 rounded-lg font-bold hover:opacity-90">
              DONATE NOW
            </Link>
            <Link to="/schedule" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-navy">
              VIEW SCHEDULE
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-navy mb-12">OUR PARTNERS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-navy font-bold">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Matches Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-navy mb-12">UPCOMING MATCHES</h2>
          <div className="max-w-3xl mx-auto">
            {matches.map((match, i) => (
              <div key={i} className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="font-bold">{match.date}</span>
                <span>vs {match.opponent}</span>
                <span className="text-gray-600">{match.time}</span>
                <span className="text-sm px-3 py-1 bg-gray-100 rounded">{match.location}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/schedule" className="text-red font-bold hover:underline">
              View Full Schedule →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}