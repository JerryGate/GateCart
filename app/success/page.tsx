"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '../store/useCart';
import { FaCheckCircle } from 'react-icons/fa';

const Success: React.FC = () => {
    const { items, clearCart } = useCartStore();

    const taxRate = 0.1;
    const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0)
    const tax = subtotal * taxRate;
    const total = items.reduce((acc, item) => acc + item.quantity, 0);
    useEffect(() => {
        clearCart()
    }, [clearCart])

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <FaCheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
                    <p className="text-gray-600 text-lg mb-6">
                        Thank you for your purchase. Your order has been successfully placed.
                    </p>

                    {/* Order Summary */}
                    {items.length > 0 ? (
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-b-0"
                                    >
                                        <div className="flex-1 text-left">
                                            <h3 className="text-base font-medium text-gray-800 truncate">{item.name}</h3>
                                            <p className="text-sm text-gray-600">
                                                ${(item.price / 100).toFixed(2)} x {item.quantity}
                                            </p>
                                        </div>
                                        <span className="text-gray-800 font-medium">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-800 font-medium">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax (10%)</span>
                                        <span className="text-gray-800 font-medium">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-gray-200 pt-2">
                                        <span className="text-gray-800 font-semibold">Total</span>
                                        <span className="text-gray-800 font-semibold">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600 mb-6">No order details available.</p>
                    )}


                    <Link href="/products" className="inline-block mt-6 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Success;