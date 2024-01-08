'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CldImage } from 'next-cloudinary';

interface props {
  src: string;
  width: number;
  height: number;
  alt: string;
  className: string;
}

const ImageWithSkeleton = ({
  src,
  width,
  height,
  alt,
  className
}: props): JSX.Element => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative bg-gray-200 overflow-hidden ${className}`}>
      <AnimatePresence>
        {!imageLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10"
          >
            <motion.div
              className="w-full h-full bg-gray-300"
              animate={{
                scale: [1, 1.02, 1],
                borderRadius: ['0%', '50%', '0%'],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 1.5
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <CldImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoadingComplete={() => {
          setImageLoaded(true);
        }}
      />
    </div>
  );
};

export default ImageWithSkeleton;
