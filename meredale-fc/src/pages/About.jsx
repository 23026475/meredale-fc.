import { Link } from 'react-router-dom';
import { usePlayers } from '../hooks/usePlayers';
import { urlFor } from '../lib/sanity';

export default function About() {
  const { players, loading } = usePlayers();
  
  // Get coaches from staff (if you have staff schema)
  // For now, we'll use static content

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy to-navy/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ABOUT MEREDALE FC</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Learn about our history, mission, and the people behind the club
          </p>
        </div>
      </section>

      {/* Club Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">OUR STORY</h2>
              <div className="w-20 h-1 bg-red mx-auto"></div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Meredale FC was founded in 2016 with a simple mission: to provide quality soccer 
                training and character development to young athletes in our community. What started 
                as a small group of passionate players has grown into one of the most respected 
                youth soccer clubs in the region.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Over the years, we've developed hundreds of players, many of whom have gone on to 
                play at higher levels, including high school varsity, college, and even professional 
                academies. But our true measure of success isn't just trophies—it's the life skills 
                our players learn: teamwork, discipline, resilience, and leadership.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Today, Meredale FC serves over 50 active players across 4 age groups, from U10 to 
                U16. We're proud to be a community-centered club that welcomes players of all 
                backgrounds and skill levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-navy mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To develop young athletes through quality soccer training, teaching life skills, 
                and fostering a love for the beautiful game in a supportive, community-focused environment.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-5xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold text-navy mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be a leading youth soccer club known for developing exceptional players and 
                outstanding citizens who positively impact their communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Club Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">OUR VALUES</h2>
            <div className="w-20 h-1 bg-red mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-xl font-bold text-navy mb-2">Teamwork</h4>
              <p className="text-gray-500 text-sm">Success is built together</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h4 className="text-xl font-bold text-navy mb-2">Resilience</h4>
              <p className="text-gray-500 text-sm">Never give up attitude</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-xl font-bold text-navy mb-2">Excellence</h4>
              <p className="text-gray-500 text-sm">Strive to be your best</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h4 className="text-xl font-bold text-navy mb-2">Community</h4>
              <p className="text-gray-500 text-sm">Lifting each other up</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Staff Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">COACHING STAFF</h2>
            <div className="w-20 h-1 bg-red mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated coaches who develop our players
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Coach 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
              <div className="bg-navy h-32 flex items-center justify-center">
                <span className="text-5xl">👨‍🏫</span>
              </div>
              <div className="p-4">
                <h4 className="text-xl font-bold text-navy">Coach Michael</h4>
                <p className="text-red font-semibold mb-2">Head Coach</p>
                <p className="text-gray-500 text-sm">UEFA B License | 10+ years experience</p>
              </div>
            </div>
            {/* Coach 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
              <div className="bg-navy h-32 flex items-center justify-center">
                <span className="text-5xl">👩‍🏫</span>
              </div>
              <div className="p-4">
                <h4 className="text-xl font-bold text-navy">Coach Sarah</h4>
                <p className="text-red font-semibold mb-2">Assistant Coach</p>
                <p className="text-gray-500 text-sm">Former College Player | 8 years experience</p>
              </div>
            </div>
            {/* Coach 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
              <div className="bg-navy h-32 flex items-center justify-center">
                <span className="text-5xl">🧑‍🏫</span>
              </div>
              <div className="p-4">
                <h4 className="text-xl font-bold text-navy">Coach David</h4>
                <p className="text-red font-semibold mb-2">Goalkeeper Coach</p>
                <p className="text-gray-500 text-sm">Specialized GK Training | 6 years experience</p>
              </div>
            </div>
            {/* Coach 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden text-center">
              <div className="bg-navy h-32 flex items-center justify-center">
                <span className="text-5xl">🧑‍⚕️</span>
              </div>
              <div className="p-4">
                <h4 className="text-xl font-bold text-navy">Coach Lisa</h4>
                <p className="text-red font-semibold mb-2">Fitness Coach</p>
                <p className="text-gray-500 text-sm">Certified S&C Specialist | 5 years experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Club Achievements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">ACHIEVEMENTS</h2>
            <div className="w-20 h-1 bg-red mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center border rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-3">🏆</div>
              <h4 className="text-xl font-bold text-navy mb-2">League Champions</h4>
              <p className="text-gray-500">2022, 2023, 2024</p>
            </div>
            <div className="text-center border rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-3">🥈</div>
              <h4 className="text-xl font-bold text-navy mb-2">Tournament Finalists</h4>
              <p className="text-gray-500">Summer Cup 2023, 2024</p>
            </div>
            <div className="text-center border rounded-lg p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-3">⭐</div>
              <h4 className="text-xl font-bold text-navy mb-2">Players Developed</h4>
              <p className="text-gray-500">50+ alumni in higher levels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section (moved from separate page) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">OUR SPONSORS</h2>
            <div className="w-20 h-1 bg-red mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Thank you to our generous sponsors who support our mission
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 shadow-sm">
              <span className="text-navy font-bold">Sponsor 1</span>
            </div>
            <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 shadow-sm">
              <span className="text-navy font-bold">Sponsor 2</span>
            </div>
            <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 shadow-sm">
              <span className="text-navy font-bold">Sponsor 3</span>
            </div>
            <div className="bg-white rounded-lg p-6 flex items-center justify-center h-24 shadow-sm">
              <span className="text-navy font-bold">Sponsor 4</span>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/contact" className="text-red hover:underline">
              Become a sponsor →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}