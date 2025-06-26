import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Stripe from 'stripe';

interface Props {
    product: Stripe.Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const price = product.default_price as Stripe.Price;
    return (
        <div className="max-w-sm w-full rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg mx-auto bg-white dark:bg-gray-900">
            <div className="relative w-full h-48 sm:h-56 md:h-64">
                {product.images && product.images[0] && (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        priority={false}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2 truncate">{product.name}</h3>
                {product.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">{product.description}</p>
                )}
                <div className="flex items-center justify-between">
                    {price && price.unit_amount && (
                        <span className="text-lg sm:text-2xl font-bold text-teal-600">
                            N{(price.unit_amount / 100).toFixed(2)}
                        </span>
                    )}
                    <Link
                        href={`/products/${product.id}`}
                        className="px-3 py-2 sm:px-4 sm:py-2 bg-teal-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;