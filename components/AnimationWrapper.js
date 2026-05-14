// ./components/AnimationWrapper.js
'use client'; // This is crucial in the App Router to enable client-side interactivity

import { motion } from 'framer-motion';

const variants = {
  // Initial state: starts completely transparent and slightly below its final position
  hidden: { opacity: 0, y: 20 },
  // Final state: fully opaque and in its final position
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      // Define a smooth, spring-like transition
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.2 // A slight delay before the animation starts
    },
  },
};

export default function AnimationWrapper({ children }) {
  return (
    <motion.div
      // Set the initial and animate states based on the variants object
      initial="hidden"
      animate="visible"
      // Apply the defined variants
      variants={variants}
    >
      {children}
    </motion.div>
  );
}