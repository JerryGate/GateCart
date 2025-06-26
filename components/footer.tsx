"use client"
import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterProps {
    companyName?: string;
}

const Footer: React.FC<FooterProps> = ({ companyName = 'GateCart' }) => {
    const navigationLinks: FooterLink[] = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ];

    const socialLinks: FooterLink[] = [
        { label: 'Twitter', href: 'https://twitter.com' },
        { label: 'Facebook', href: 'https://facebook.com' },
        { label: 'Instagram', href: 'https://instagram.com' },
    ];

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-200 py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Gate<span className='text-teal-500'>Cart</span></h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Discover premium products at GateCart. Shop with confidence and join our community.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {navigationLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href}
                                        className="text-gray-400 hover:text-teal-400 transition-colors duration-200 text-sm">
                                        {link.label}

                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Stay Connected</h3>
                        <form onSubmit={(e) => e.preventDefault()} className="mb-6">
                            <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                                Subscribe to our newsletter
                            </label>
                            <div className="flex">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                                >
                                    {link.label === 'Twitter' && <FaTwitter size={24} />}
                                    {link.label === 'Facebook' && <FaFacebook size={24} />}
                                    {link.label === 'Instagram' && <FaInstagram size={24} />}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-400">
                        © {currentYear} {companyName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;