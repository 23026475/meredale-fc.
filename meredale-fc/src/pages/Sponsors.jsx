import { useSponsors } from '../hooks/useSponsors';
import { urlFor } from '../lib/sanity';
import { Link } from 'react-router-dom';

export default function Sponsors() {
  const { sponsors, loading, error } = useSponsors();

  // Group sponsors by tier
  const platinumSponsors = sponsors.filter(s => s.tier === 'platinum');
  const goldSponsors = sponsors.filter(s => s.tier === 'gold');
  const silverSponsors = sponsors.filter(s => s.tier === 'silver');
  const bronzeSponsors = sponsors.filter(s => s.tier === 'bronze');

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-navy text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">OUR SPONSORS & PARTNERS</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We're grateful for the generous support of our sponsors who help make our programs possible.
          </p>
        </div>
      </section>

      {/* Become a Sponsor CTA */}
      <section className="py-12 bg-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in Sponsoring?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Partner with us to support youth soccer in our community.
          </p>
          <Link to="/contact" className="inline-block bg-white text-red px-6 py-2 rounded-lg font-bold hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Sponsors List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red"></div>
              <p className="text-gray-500 mt-4">Loading sponsors...</p>
            </div>
          ) : sponsors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No sponsors added yet.</p>
            </div>
          ) : (
            <>
              {/* Platinum Sponsors */}
              {platinumSponsors.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-navy text-center mb-8">Platinum Partners</h2>
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {platinumSponsors.map((sponsor) => (
                      <div key={sponsor._id} className="bg-gray-50 rounded-lg p-8 text-center">
                        {sponsor.logo && (
                          <div className="mb-4 h-32 flex items-center justify-center">
                            <img 
                              src={urlFor(sponsor.logo).width(300).height(150).url()} 
                              alt={sponsor.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-navy mb-2">{sponsor.name}</h3>
                        {sponsor.description && (
                          <p className="text-gray-600">{sponsor.description}</p>
                        )}
                        {sponsor.website && (
                          <a 
                            href={sponsor.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-red hover:underline"
                          >
                            Visit Website →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gold Sponsors */}
              {goldSponsors.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-navy text-center mb-8">Gold Sponsors</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {goldSponsors.map((sponsor) => (
                      <div key={sponsor._id} className="bg-gray-50 rounded-lg p-6 text-center">
                        {sponsor.logo ? (
                          <div className="mb-4 h-24 flex items-center justify-center">
                            <img 
                              src={urlFor(sponsor.logo).width(200).height(100).url()} 
                              alt={sponsor.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <h3 className="text-lg font-bold text-navy mb-2">{sponsor.name}</h3>
                        )}
                        {sponsor.website && (
                          <a 
                            href={sponsor.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-sm text-red hover:underline"
                          >
                            Visit →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Silver & Bronze Sponsors */}
              {(silverSponsors.length > 0 || bronzeSponsors.length > 0) && (
                <div>
                  <h2 className="text-2xl font-bold text-navy text-center mb-8">Supporting Partners</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...silverSponsors, ...bronzeSponsors].map((sponsor) => (
                      <div key={sponsor._id} className="bg-gray-50 rounded-lg p-4 text-center">
                        {sponsor.logo ? (
                          <img 
                            src={urlFor(sponsor.logo).width(150).height(75).url()} 
                            alt={sponsor.name}
                            className="max-h-12 max-w-full object-contain mx-auto"
                          />
                        ) : (
                          <p className="text-sm font-medium text-navy">{sponsor.name}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}