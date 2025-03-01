'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CityImageProps {
  imageUrl: string | null;
  isAnswered: boolean;
}

const CityImage: React.FC<CityImageProps> = ({ imageUrl, isAnswered }) => {
  const [oldImage, setOldImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<string | null>(imageUrl);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (imageUrl !== newImage) {
      setOldImage(newImage);
      setNewImage(imageUrl);
      setIsLoading(true);
    }
  }, [imageUrl, newImage]);

  if (!imageUrl) return null;

  return (
    <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-4 bg-gray-100">
      {/* Old image stays visible until new one loads */}
      {oldImage && (
        <div className="absolute inset-0">
          <Image
            src={oldImage}
            alt="Previous city"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover ${
              isAnswered ? 'filter-none' : 'blur-sm brightness-90'
            }`}
          />
        </div>
      )}

      {/* New image */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src={imageUrl}
          alt="City"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover ${
            isAnswered ? 'filter-none' : 'blur-sm brightness-90'
          }`}
          onLoadingComplete={() => {
            // Remove old image and show new one
            setOldImage(null);
            setIsLoading(false);
          }}
        />
      </div>

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-orange-1 border-t-transparent" />
        </div>
      )}
    </div>
  );
};

export default CityImage; 