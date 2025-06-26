"use client"
import React from 'react';
import Link from 'next/link';
import { useCartStore } from '../store/useCart';
import checkoutCart from './cart-actions';
import * as motion from "motion/react-client";

const Checkout: React.FC = () => {
    const { items } = useCartStore();
    const subtotal = items.reduce((acc, item) => acc + (item.quantity * (item.price / 100)), 0)
    const total = subtotal;

    return (
        <motion.div
            className="min-h-screen py-12"
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
                    Checkout
                </motion.h1>
                {items.length === 0 ? (
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Your cart is empty.</p>
                        <Link
                            href="/products"
                            className="inline-block px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
                        >
                            Shop Now
                        </Link>
                    </motion.div>
                ) : (
                    <div className="md:grid md:grid-cols-3 md:gap-8">
                        <motion.div
                            className="md:col-span-2 space-y-6"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
                        >
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Order Items</h2>
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                                        >
                                            <div className="flex-1">
                                                <h3 className="text-base font-medium text-gray-800 dark:text-white truncate">{item.name}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    N{(item.price / 100).toFixed(2)} x {item.quantity}
                                                </p>
                                            </div>
                                            <span className="text-gray-800 dark:text-white font-medium">
                                                N{((item.price * item.quantity) / 100).toFixed(2)}
                                            </span>
                                        </div>
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
                                <form action={checkoutCart}>
                                    <input type='hidden' name="items" value={JSON.stringify(items)} />
                                    <button
                                        type='submit'
                                        className="w-full mt-6 px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
                                        disabled={items.length === 0}>
                                        Place Order
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Checkout;