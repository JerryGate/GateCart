"use client"

import Image from "next/image"
import Stripe from "stripe"
import { useCartStore } from "@/app/store/useCart"
import * as motion from "motion/react-client"

interface Props {
    product: Stripe.Product
}

const ProductDetailsCard: React.FC<Props> = ({ product }) => {
    const { addToCart, removeFromCart, items } = useCartStore()
    const cartItem = items.find((item) => item.id === product.id)
    const quantity = cartItem ? cartItem.quantity : 0
    const price = product.default_price as Stripe.Price

    const onAddItem = () => {
        addToCart({
            id: product.id,
            name: product.name,
            description: product.description ? product.description : null,
            price: price.unit_amount as number,
            image: product.images ? product.images[0] : null,
            quantity: 1
        });
    }

    return (
        <motion.div
            className="mx-2 sm:mx-4 md:max-w-4xl md:mx-auto px-0 sm:px-2 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row bg-white dark:bg-gray-900"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
        >
            <div className="relative w-full h-64 sm:h-80 md:w-1/2 md:h-auto">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
            <div className="p-5 sm:p-8 md:w-1/2 flex flex-col justify-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">{product.name}</h1>
                {product.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-base mb-6 leading-relaxed">{product.description}</p>
                )}
                {price && price.unit_amount && (
                    <p className="text-2xl font-semibold text-teal-600 mb-6">
                        N{(price.unit_amount / 100).toFixed(2)}
                    </p>
                )}
                <div className="flex items-center mb-6">
                    <label htmlFor="quantity" className="mr-4 text-gray-700 dark:text-gray-200 font-medium">
                        Quantity: {quantity}
                    </label>
                    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                        <button
                            onClick={() => removeFromCart(product.id)}
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            aria-label="Decrease quantity"
                        >
                            -
                        </button>
                        <span className="px-4 py-2 text-gray-800 dark:text-white font-medium">{quantity}</span>
                        <button
                            onClick={onAddItem}
                            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                </div>
                {/* Optionally, add an "Add to Cart" button for mobile */}
                {/* <button
                    className="w-full px-6 py-3 bg-teal-600 text-white text-base font-medium rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
                    onClick={onAddItem}
                >
                    Add to Cart
                </button> */}
            </div>
        </motion.div>
    )
}

export default ProductDetailsCard