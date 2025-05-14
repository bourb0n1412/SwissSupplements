

import Image from 'next/image';
import Link from "next/link";

// Pfad zur API deines Shop-Service
const SHOP_API_URL = 'http://localhost:8080/products';

async function getProducts() {
    try {
        const res = await fetch(SHOP_API_URL, { cache: 'no-store' });

        // Prüfen, ob die Antwort okay ist
        if (!res.ok) {
            const errorDetails = await res.text(); // Details der Fehlermeldung bekommen
            throw new Error(`Fehler beim Laden der Produkte: ${errorDetails}`);
        }
        return res.json();
    } catch (error) {
        console.error('Fehler beim Abrufen der Produkte:', error);
        throw new Error('Fehler beim Laden der Produkte');
    }
}

export default async function SubscribePage({ params }) {
    const products = await getProducts();
    const product = products.find(p => p.id === params.productId);

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-red-500">Produkt nicht gefunden!</h2>
                <Link href="/shop" className="text-green-600 hover:underline">
                    Zurück zum Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 text-gray-800">
            {/* ... Navbar bleibt gleich ... */}
            <main className="pt-20">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col md:flex-row items-center md:items-start">
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
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h2>
                            <p className="text-gray-600 mb-6">{product.description}</p>
                            <p className="text-green-600 text-2xl font-semibold mb-6">{product.price ?? `${product.price} CHF`}</p>
                            <form className="mt-6">
                                <div className="mb-4">
                                    <label className="block text-left text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                        placeholder="Ihr Name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-left text-gray-700">E-Mail-Adresse</label>
                                    <input
                                        type="email"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                        placeholder="Ihre E-Mail-Adresse"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
                                >
                                    Abonnement abschließen
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-green-600 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 SwissSuplements. Alle Rechte vorbehalten.</p>
                </div>
            </footer>
        </div>
    );
}
