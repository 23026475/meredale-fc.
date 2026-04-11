import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePlayers } from '../hooks/usePlayers';
import { urlFor } from '../lib/sanity';

export default function TeamPreview() {
  const { players, loading } = usePlayers();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(4);

  // Update cards to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsToShow(1);
      else if (window.innerWidth < 768) setCardsToShow(2);
      else if (window.innerWidth < 1024) setCardsToShow(3);
      else setCardsToShow(4);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (!isAutoPlaying) return;
    if (!players || players.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, players.length - cardsToShow);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [players, players?.length, isAutoPlaying, cardsToShow]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="spinner mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading players...</p>
      </div>
    );
  }

  if (!players || players.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No players added yet. Check back soon!</p>
      </div>
    );
  }

  const visiblePlayers = players.slice(currentIndex, currentIndex + cardsToShow);
  const maxIndex = Math.max(0, players.length - cardsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative">
      {/* Cards Container - No borders, blends with background */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-500">
          {visiblePlayers.map((player) => (
            <div
              key={player._id}
              className="group overflow-hidden transition-all duration-300 hover:scale-105"
            >
              {/* Player Image - No card styling */}
              <div className="relative overflow-hidden">
                {player.photo ? (
                  <img
                    src={urlFor(player.photo).width(400).height(400).url()}
                    alt={player.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                    <span className="text-5xl">⚽</span>
                  </div>
                )}
              </div>
              
              {/* Player Info - Centered */}
              <div className="text-center mt-4">
                <h3 className="text-lg font-bold text-navy mb-2">{player.name}</h3>
                <Link
                  to={`/players/${player._id}`}
                  className="inline-block bg-red text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-navy transition"
                >
                  View Bio
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {players.length > cardsToShow && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-red transition -ml-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-red transition -mr-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}