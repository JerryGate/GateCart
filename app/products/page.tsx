import React from 'react';
import ProductList from '@/components/productList';
import { stripe } from '@/lib/stripe';
import * as motion from "motion/react-client";

const Products: React.FC = async () => {
    const products = await stripe.products.list({
        expand: ["data.default_price"]
    });
    return (
        <motion.div
            className="min-h-screen py-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    className="text-3xl font-bold text-teal-600 mb-5 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                >
                    Our Products
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
                >
                    <ProductList products={products.data} />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Products;