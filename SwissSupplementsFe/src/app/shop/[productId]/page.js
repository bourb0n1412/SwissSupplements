"use client";

import Image from 'next/image';
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

// API URL for the Shop-Service (replace with the actual endpoint)
const SHOP_API_URL = "http://localhost:8080/products";  // Example URL

export default function ProductPage() {
    const { productId } = useParams(); // Access the productId from URL
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:8080/shop/products");
                const data = await res.json();
                setProducts(data);

                const foundProduct = data.find(p => p.id === productId);
                setProduct(foundProduct);
                setLoading(false);
            } catch (error) {
                console.error("Fehler beim Laden der Produkte:", error);
            }
        };

        fetchProducts();
    }, []);
    console.log("prod: ", products)
    console.log("uno: ", product)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return (
            <div className="bg-[#1c1c1c] text-center py-20 text-white">
                <h2 className="text-2xl font-semibold text-red-500">Produkt nicht gefunden!</h2>
                <Link href="/shop" className="text-red-400 hover:underline mt-4 block">
                    Zurück zum Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#1c1c1c] text-white min-h-screen">
            <main className="pt-20">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                        <div className="w-full md:w-1/2 px-4">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={500}
                                height={500}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-4 mt-6 md:mt-0">
                            <h2 className="text-3xl font-bold text-white mb-4">{product.title}</h2>
                            <p className="text-gray-300 mb-6">{product.description}</p>
                            <p className="text-red-500 text-2xl font-semibold mb-6">
                                {product.price ?? `${product.price} CHF`}
                            </p>

                            <form className="mt-6">
                                <div className="mb-4 text-left">
                                    <label className="block text-sm mb-1 text-gray-300">Name</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-600 bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="Ihr Name"
                                    />
                                </div>
                                <div className="mb-4 text-left">
                                    <label className="block text-sm mb-1 text-gray-300">E-Mail-Adresse</label>
                                    <input
                                        type="email"
                                        className="w-full border border-gray-600 bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        placeholder="Ihre E-Mail-Adresse"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-300"
                                >
                                    Abonnement abschließen
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <Link href="/shop" className="text-red-400 hover:underline">
                        Zurück zum Shop
                    </Link>
                </div>
            </main>

            <footer className="bg-black text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Swiss Supplements. Alle Rechte vorbehalten.</p>
                </div>
            </footer>
        </div>
    );
}
