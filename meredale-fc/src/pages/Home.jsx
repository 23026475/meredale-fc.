import { Link } from 'react-router-dom';
import { useFixtures } from '../hooks/useFixtures';
import { useSponsors } from '../hooks/useSponsors';
import { urlFor } from '../lib/sanity';
import HeroSlideshow from '../components/HeroSlideshow';
import TeamPreview from '../components/TeamPreview';
import GalleryPreview from '../components/GalleryPreview';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Home() {
  const { fixtures, loading: fixturesLoading } = useFixtures();
  const { sponsors, loading: sponsorsLoading } = useSponsors();

  const upcomingFixtures = fixtures?.filter(f => !f.isComplete).slice(0, 3) || [];

  const fixturesRef = useScrollReveal();
  const aboutRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const squadRef = useScrollReveal();
  const sponsorsRef = useScrollReveal();
  const galleryRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div>
      <HeroSlideshow />

      {/* Upcoming Fixtures */}
      <section ref={fixturesRef} className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">UPCOMING MATCHES</h2>
            <div className="w-20 h-1 bg-red mx-auto"></div>
          </div>
          
          {fixturesLoading ? (
            <div className="text-center py-12">
              <div className="spinner mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading fixtures...</p>
            </div>
          ) : upcomingFixtures.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-4">
              {upcomingFixtures.map((fixture) => (
                <div key={fixture._id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition">
                  <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
                    <div className="md:w-1/4">
                      <p className="text-red font-bold">{fixture.date}</p>
                      <p className="text-gray-500 text-sm">{fixture.time || 'TBD'}</p>
                    </div>
                    <div className="md:w-2/4 text-center">
                      <p className="text-xl font-bold text-navy">vs {fixture.opponent}</p>
                      <p className="text-gray-500">{fixture.competition || 'League Match'}</p>
                    </div>
                    <div className="md:w-1/4 text-right">
                      <span className="inline-block bg-navy text-white px-4 py-1 rounded-full text-sm">
                        {fixture.homeAway || 'Home'}
                      </span>
                      <p className="text-gray-400 text-sm mt-1">{fixture.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No upcoming fixtures scheduled yet.</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link to="/fixtures" className="text-red font-semibold hover:underline">
              View all fixtures →
            </Link>
          </div>
        </div>
      </section>

      {/* About the Club */}
      <section ref={aboutRef} className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">ABOUT THE CLUB</h2>
            <div className="w-20 h-1 bg-red mx-auto mb-8"></div>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Meredale FC is a community-based soccer club dedicated to developing young talent, 
              promoting sportsmanship, and creating opportunities for players of all ages.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Founded in 2016, our mission is to provide a safe, supportive environment 
              where players can grow both on and off the field.
            </p>
            <Link to="/about" className="text-red font-semibold hover:underline">
              Learn more about us →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section ref={statsRef} className="section bg-navy text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red">50+</div>
              <div className="text-sm font-semibold">Active Players</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red">4</div>
              <div className="text-sm font-semibold">Age Groups</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red">10+</div>
              <div className="text-sm font-semibold">Years</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-red">100+</div>
              <div className="text-sm font-semibold">Games</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Squad */}
      <section ref={squadRef} className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">THE SQUAD</h2>
            <div className="w-20 h-1 bg-red mx-auto"></div>
          </div>
          <TeamPreview />
        </div>
      </section>

      {/* Sponsors - Moved before Gallery */}
      <section ref={sponsorsRef} className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">OUR PARTNERS</h2>
            <div className="w-20 h-1 bg-red mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We're proud to work with these amazing organizations.
            </p>
          </div>
          
          {sponsorsLoading ? (
            <div className="text-center py-12">
              <div className="spinner mx-auto"></div>
            </div>
          ) : sponsors.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
              {sponsors.map((sponsor) => (
                <a
                  key={sponsor._id}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg p-4 flex flex-col items-center justify-center w-40 hover:shadow-lg transition hover:scale-105"
                >
                  {sponsor.logo ? (
                    <img
                      src={urlFor(sponsor.logo).width(120).height(80).url()}
                      alt={sponsor.name}
                      className="h-16 w-auto object-contain mb-2"
                    />
                  ) : (
                    <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">🤝</span>
                    </div>
                  )}
                  <p className="text-navy font-semibold text-sm text-center">{sponsor.name}</p>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No sponsors yet.</p>
              <Link to="/contact" className="inline-block mt-4 text-red hover:underline">
                Become a sponsor →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Gallery - Now at the end before CTA */}
      <section ref={galleryRef} className="section py-0">
        <GalleryPreview />
      </section>

      {/* Call to Action */}
      <section ref={ctaRef} className="section bg-red text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">SUPPORT THE FUTURE</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Every donation helps keep soccer accessible for young athletes.
          </p>
          <Link 
            to="/donate" 
            className="inline-block bg-white text-red px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition transform hover:scale-105"
          >
            Make a Donation
          </Link>
        </div>
      </section>
    </div>
  );
}