"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { useCartStore } from '@/app/store/useCart';
import * as motion from "motion/react-client";

const CartRoute = () => {
    const { items, addToCart, removeFromCart, deleteFromCart } = useCartStore();
    const subtotal = items.reduce((acc, item) => acc + (item.quantity * (item.price / 100)), 0)
    const total = subtotal

    return (
        <motion.div
            className="min-h-screen py-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
                >
                    Your Cart
                </motion.h1>
                {items.length === 0 ? (
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Your cart is empty.</p>
                        <Link href="/products"
                            className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors">
                            Shop Now
                        </Link>
                    </motion.div>
                ) : (
                    <div className="md:grid md:grid-cols-3 md:gap-8">
                        <motion.div
                            className="md:col-span-2"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Cart Items</h2>
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            className="flex items-center justify-center border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.1 }}
                                        >
                                            <div className="w-20 h-20 relative flex-shrink-0">
                                                {item && item.image && (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="rounded-lg object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1 ml-4">
                                                <h3 className="text-base md:text-lg font-medium text-gray-800 dark:text-white truncate">{item.name}</h3>
                                                {item && item.price && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        N{(item.price / 100).toFixed(2)} x {item.quantity}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="px-3 py-1 border rounded-l-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        aria-label={`Decrease quantity of ${item.name}`}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4 py-1 text-gray-800 dark:text-white font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => addToCart(item)}
                                                        className="px-3 py-1 border rounded-r-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        aria-label={`Increase quantity of ${item.name}`}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => deleteFromCart(item.id)}
                                                    className="mx-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500">
                                                    <FaTrash size={16} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="md:col-span-1"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.4, ease: "easeInOut" }}
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sticky top-4">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Order Summary</h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                        <span className="text-gray-800 dark:text-white font-medium">N{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                                        <span className="text-gray-800 dark:text-white font-semibold">Total</span>
                                        <span className="text-gray-800 dark:text-white font-semibold">N{total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Link href="/checkout" className="w-full mt-6 block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors">
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default CartRoute