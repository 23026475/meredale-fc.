import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';

export default function CoachDetail() {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCoach() {
      try {
        const query = `*[_type == "staff" && _id == $id][0] {
          _id,
          name,
          role,
          photo,
          bio,
          email
        }`;
        
        const data = await client.fetch(query, { id });
        setCoach(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    
    fetchCoach();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading coach details...</p>
        </div>
      </div>
    );
  }

  if (error || !coach) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red text-lg">Coach not found</p>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{coach.name}</h1>
          <p className="text-xl">{coach.role}</p>
        </div>
      </section>

      {/* Coach Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Coach Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl">
                {coach.photo ? (
                  <img
                    src={urlFor(coach.photo).width(600).height(600).url()}
                    alt={coach.name}
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                    <span className="text-8xl">👨‍🏫</span>
                  </div>
                )}
              </div>

              {/* Coach Info */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-red text-white px-4 py-2 rounded-full text-xl font-bold">
                      {coach.role}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                {coach.email && (
                  <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                    <h3 className="text-xl font-bold text-navy mb-4">Contact</h3>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${coach.email}`} className="text-gray-600 hover:text-red">
                        {coach.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Biography */}
                {coach.bio && (
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-3">About {coach.name}</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {coach.bio}
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