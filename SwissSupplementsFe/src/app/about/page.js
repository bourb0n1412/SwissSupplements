"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    const [info, setInfo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        fetch("http://localhost:8080/info/api/info")
            .then((res) => res.json())
            .then(setInfo)
            .catch(console.error);
    }, []);

    if (!info) return <div>Loading...</div>;

    return (
        <div className="bg-[#1c1c1c] text-white min-h-screen">
            {/* Navbar */}
            <header className="bg-black text-white py-6 shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/">
                        <Image src="/pic/logobanner.png" alt="Logo Banner" width={200} height={50} />
                    </Link>
                    <div className="sm:hidden flex items-center" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <nav>
                        <ul className={`sm:flex ${isOpen ? 'block' : 'hidden'} space-x-6`}>
                            <li><Link href="/" className="hover:underline hover:text-red-500 font-semibold transition duration-300">Home</Link></li>
                            <li><Link href="/about" className="hover:underline hover:text-red-500 font-semibold transition duration-300">Über uns</Link></li>
                            <li><Link href="/shop" className="hover:underline hover:text-red-500 font-semibold transition duration-300">Shop</Link></li>
                            <li><Link href="/#contact" className="hover:underline hover:text-red-500 font-semibold transition duration-300">Beratung</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Wer wir sind */}
            <section className="py-16 container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6 text-white">Wer wir sind</h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">{info.company.mission}</p>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">{info.company.vision}</p>
            </section>

            {/* Unser Team */}
            <section className="bg-[#2a2a2a] mt-4 py-16 container mx-auto px-4 text-center">
                <h3 className="text-3xl font-bold mb-10 text-white">Unser Team</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {info.team.map((member, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:scale-105 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 text-white rounded-lg">
                                <h4 className="text-lg font-bold">{member.name}</h4>
                                <p className="text-sm mt-2 text-red-400">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Swiss Supplements. Alle Rechte vorbehalten.</p>
                </div>
            </footer>
        </div>
    );
}
