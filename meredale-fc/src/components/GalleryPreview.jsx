import { Link } from 'react-router-dom';
import { useGallery } from '../hooks/useGallery';
import { urlFor } from '../lib/sanity';

export default function GalleryPreview() {
  const { images, loading } = useGallery();
  const previewImages = images?.slice(0, 8) || [];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="spinner mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading gallery...</p>
      </div>
    );
  }

  if (previewImages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No photos yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Full width collage - no gaps, no borders */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {previewImages.map((image, index) => (
          <div
            key={image._id}
            className={`overflow-hidden ${index === 0 ? 'md:row-span-2' : ''}`}
          >
            <img
              src={urlFor(image.image).width(600).height(500).url()}
              alt={image.caption || 'Gallery image'}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
              style={{ minHeight: '200px' }}
            />
          </div>
        ))}
      </div>
      
      {/* View Gallery Link */}
      <div className="text-center py-8">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-navy font-semibold hover:text-red transition"
        >
          <span>📸</span>
          View Full Gallery
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}