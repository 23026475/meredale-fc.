import { useState } from 'react';
import { useGallery } from '../hooks/useGallery';
import { urlFor } from '../lib/sanity';

export default function Gallery() {
  const { images, loading, error } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // Get unique categories from images
  const categories = ['all', ...new Set(images.map(img => img.category).filter(Boolean))];

  // Filter images by category
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  // Group images by category for the category sections view
  const imagesByCategory = categories.reduce((acc, category) => {
    if (category === 'all') return acc;
    acc[category] = images.filter(img => img.category === category);
    return acc;
  }, {});

  // Open lightbox
  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Navigate lightbox
  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img._id === selectedImage._id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img._id === selectedImage._id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red"></div>
          <p className="text-gray-500 mt-4">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red">
          <p>Error loading gallery: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy to-navy/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">PHOTO GALLERY</h1>
          <p className="text-xl max-w-2xl mx-auto">
          Capturing memories from matches, training, and club events
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 py-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === category
                      ? 'bg-red text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Photos' : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredImages.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-gray-500 text-lg">No images in this category yet.</p>
              <p className="text-gray-400 mt-2">Check back soon for new photos!</p>
            </div>
          ) : (
            <>
              {/* Masonry-style grid */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredImages.map((image) => (
                  <div
                    key={image._id}
                    onClick={() => openLightbox(image)}
                    className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={urlFor(image.image).width(600).height(600).url()}
                        alt={image.caption || 'Gallery image'}
                        className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end">
                        <div className="p-4 text-white w-full">
                          {image.caption && (
                            <p className="text-sm font-medium">{image.caption}</p>
                          )}
                          {image.category && (
                            <p className="text-xs text-white/70 mt-1">{image.category}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Image count */}
              <div className="text-center mt-8 text-gray-500 text-sm">
                Showing {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-red transition z-10"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white hover:text-red transition z-10"
            aria-label="Previous"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white hover:text-red transition z-10"
            aria-label="Next"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={urlFor(selectedImage.image).width(1200).height(1200).url()}
              alt={selectedImage.caption || 'Gallery image'}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white text-center">
              {selectedImage.caption && (
                <p className="text-lg font-medium">{selectedImage.caption}</p>
              )}
              {selectedImage.category && (
                <p className="text-sm text-white/70 mt-1">{selectedImage.category}</p>
              )}
              {selectedImage.date && (
                <p className="text-xs text-white/50 mt-2">
                  {new Date(selectedImage.date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 right-4 text-white/50 text-sm bg-black/50 px-3 py-1 rounded-full">
            {filteredImages.findIndex(img => img._id === selectedImage._id) + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
}