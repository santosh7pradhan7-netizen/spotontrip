// ./components/DestinationCard.js
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Animation variants for Framer Motion
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Stagger effect
    },
  }),
};

export default function DestinationCard({ destination, index }) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
      initial="hidden"
      animate="visible"
      custom={index} 
      variants={cardVariants}
      // Trendy hover effect
      whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      <div className="aspect-w-4 aspect-h-5 w-full h-72">
        <Image
          // Use the image URL passed from the parent component
          src={destination.image} 
          alt={`Image of ${destination.name}`}
          fill
          // Zoom effect on hover
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-5 flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
        <p className="text-lg text-indigo-400 font-medium">
          From ${destination.price}
        </p>
        
        {/* Subtle hover detail */}
        <div className="mt-2 flex items-center text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Explore Trip <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </motion.div>
  );
}