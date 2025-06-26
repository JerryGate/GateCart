import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import FeaturedProducts from '@/components/featuredProducts';
import { stripe } from '@/lib/stripe';
import * as motion from "motion/react-client"; // <-- Add this import

const Home: React.FC = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 3
  });

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="relative py-7 px-2 sm:px-4">
        <motion.div
          className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 shadow-lg p-4 rounded-lg bg-white dark:bg-gray-900 transition-colors duration-300"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
              Welcome to Quick<span className="text-teal-500">Cart</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4 text-gray-700 dark:text-gray-300">
              Discover premium products at unbeatable prices. Shop now and elevate your experience.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-2 sm:px-8 sm:py-3 text-white bg-teal-500 font-medium rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>
          <div className="relative w-full h-60 sm:h-72 md:h-[300px] rounded-md overflow-hidden flex items-center justify-center">
            {products.data[0] && products.data[0].images[0] && (
              <Image
                src={products.data[0].images[0]}
                alt={products.data[0].name}
                fill
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-900 dark:text-white">
          Featured Products
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
        >
          {products.data.map((product) => (
            <FeaturedProducts key={product.id} product={product} />
          ))}
        </motion.div>
        <div className="text-center mt-6 sm:mt-8">
          <Link
            href="/products"
            className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
          >
            View All Products
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;