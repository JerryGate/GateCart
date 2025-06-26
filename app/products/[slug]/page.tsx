import { stripe } from '@/lib/stripe';
import ProductDetailsCard from '@/components/productDetailCard';
import * as motion from "motion/react-client";

const ProductDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const product = await stripe.products.retrieve(slug, {
        expand: ["default_price"]
    })

    if (!product) {
        return (
            <motion.div
                className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <p className="text-xl text-gray-600 dark:text-gray-300">Product not found.</p>
            </motion.div>
        );
    }

    const productJson = JSON.parse(JSON.stringify(product))

    return (
        <motion.div
            className="min-h-screen py-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
        >
            <ProductDetailsCard product={productJson} />
        </motion.div>
    );
};

export default ProductDetails;