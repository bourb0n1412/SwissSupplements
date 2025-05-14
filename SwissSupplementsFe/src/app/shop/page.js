"use client"
import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";

export default function Shop() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:8080/shop/products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Fehler beim Laden der Produkte:", error);
            }
        };

        fetchProducts();
    }, []);
    console.log("products: ", products)
    // State für das Hamburger-Menü
    const [isOpen, setIsOpen] = useState(false);

    // Funktion zum Umschalten des Menüs
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-[#1c1c1c] text-white min-h-screen">
            {/* Navbar */}
            <header className="bg-black text-white py-6 shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/">
                        <Image
                            src="/pic/logobanner.png"
                            alt="Logo Banner"
                            width={200}
                            height={50}
                        />
                    </Link>

                    {/* Hamburger Icon */}
                    <div className="sm:hidden flex items-center" onClick={toggleMenu}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </div>

                    {/* Navigation */}
                    <nav>
                        <ul className={`sm:flex ${isOpen ? 'block' : 'hidden'} space-x-6`}>
                            <li>
                                <Link
                                    href="/"
                                    className="hover:underline hover:text-red-500 font-semibold transition duration-300"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:underline hover:text-red-500 font-semibold transition duration-300"
                                >
                                    Über uns
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shop"
                                    className="hover:underline hover:text-red-500 font-semibold transition duration-300"
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#contact"
                                    className="hover:underline hover:text-red-500 font-semibold transition duration-300"
                                >
                                    Beratung
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <section className="bg-[#2a2a2a] py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6 text-white tracking-wider">
                            Shop
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
                            {products.map((product) => (
                                <Link href={`/shop/${product.id}`} key={product.id}>
                                    <div className="bg-[#1e1e1e] text-white shadow-lg rounded-lg p-6 hover:scale-105 transform transition duration-500 ease-in-out hover:shadow-xl flex flex-col h-[28rem] w-80">
                                        <div className="relative mb-4">
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                width={500}
                                                height={300}
                                                className="object-cover rounded-lg w-full h-40 transition-transform duration-500 ease-in-out hover:scale-110"
                                            />
                                        </div>
                                        <h4 className="text-lg font-bold mb-2">{product.title}</h4>
                                        <p className="text-gray-400 mb-4 flex-grow">
                                            {product.description}
                                        </p>
                                        <p className="text-red-500 text-xl font-semibold">
                                            {product.price}.-
                                        </p>
                                        <div className="mt-4">
                                            <button className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                                                Details ansehen
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-black text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Swiss Supplements. Alle Rechte vorbehalten.</p>
                </div>
            </footer>
        </div>
    );
}
