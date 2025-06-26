import React from 'react';
import * as motion from "motion/react-client";

const About = () => {
    return (
        <motion.div
            className="min-h-screen dark:bg-gray-950 py-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">About Gate<span className='text-teal-500'>Cart</span></h1>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Our Mission</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        At GateCart, we aim to provide a seamless shopping experience with high-quality products at affordable prices.
                        Our mission is to empower customers with choice and convenience.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Our Story</h2>
                    <div className="text-gray-600 dark:text-gray-300 mb-6">
                        <p>
                            Founded in 2020, GateCart started as a small venture to bring unique products to local markets. Today, we’ve grown into a trusted online store,
                            serving customers worldwide with a passion for quality and customer satisfaction.
                        </p>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Why Choose Us?</h2>
                    <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                        <li className="mb-2">Premium products curated for you.</li>
                        <li className="mb-2">Fast and reliable shipping.</li>
                        <li className="mb-2">Exceptional customer support.</li>
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

export default About;