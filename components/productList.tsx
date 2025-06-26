"use client"
import React, { useState } from 'react'
import Stripe from 'stripe'
import ProductCard from './productCard'
import * as motion from "motion/react-client"

interface Props {
    products: Stripe.Product[]
}

const ProductList: React.FC<Props> = ({ products }) => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const filteredProducts = products.filter((product) => {
        const term = searchTerm.toLowerCase()
        const nameMatch = product.name && product.name.toLowerCase().includes(term)
        const descriptionMatch = product.description && product.description.toLowerCase().includes(term)
        return nameMatch || descriptionMatch;
    })

    return (
        <motion.div
            className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
        >
            <div className="mb-6 flex justify-center">
                <label htmlFor="search" className="sr-only">Search products</label>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full max-w-md p-2 sm:p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 outline-none transition-all"
                />
            </div>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.08
                        }
                    }
                }}
            >
                {filteredProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default ProductList