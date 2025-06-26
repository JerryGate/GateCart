"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from '@/app/store/useCart';
import { usePathname } from 'next/navigation';
import ModeToggle from './mode-toggle';

interface NavLink {
    label: string;
    href: string;
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { items } = useCartStore();
    const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    const navLinks: NavLink[] = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Checkout', href: '/checkout' },
        { label: 'About', href: '/about' },
    ];

    return (
        <nav className="shadow-md max-w-7xl mx-auto z-50 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 sticky top-0 transition-colors duration-300">
            <div className="flex justify-between items-center h-16">
                <div className="flex-shrink-0">
                    <Link href="/">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Gate<span className='text-teal-500'>Cart</span>
                        </h1>
                    </Link>
                </div>
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={`text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-sm uppercase tracking-wide transition-colors duration-200 ${pathname === link.href
                                ? 'border-b-2 border-teal-600 text-teal-600 dark:text-teal-400'
                                : ''
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center justify-center gap-4">
                    <ModeToggle />
                    <Link
                        href="/cart"
                        className="relative text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
                        aria-label="Cart"
                    >
                        <FaShoppingCart size={24} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden ml-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>
            {/* Mobile Nav */}
            <div
                className={`md:hidden fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeMenu}
                aria-hidden={!isOpen}
            >
                <div
                    className={`absolute top-0 left-0 w-3/4 max-w-xs h-full bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col h-full py-8 px-6 space-y-6">
                        <div className="flex items-center justify-between mb-6">
                            <Link href="/" onClick={closeMenu}>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Gate<span className='text-teal-500'>Cart</span>
                                </h1>
                            </Link>
                            <button
                                className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none"
                                onClick={closeMenu}
                                aria-label="Close menu"
                            >
                                <FaTimes size={24} />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={`text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 font-medium text-base uppercase tracking-wide transition-colors duration-200 ${pathname === link.href
                                        ? 'border-b-2 border-teal-600 text-teal-600 dark:text-teal-400'
                                        : ''
                                        }`}
                                    onClick={closeMenu}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto flex items-center gap-4">
                            <ModeToggle />
                            <Link
                                href="/cart"
                                className="relative text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
                                aria-label="Cart"
                                onClick={closeMenu}
                            >
                                <FaShoppingCart size={24} />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;