"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";

export default function Home() {
  // State für das Hamburger-Menü
  const [isOpen, setIsOpen] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // Funktion zum Umschalten des Menüs
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // Hole Empfehlungen vom recommend-service
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:5001/recommendations');
        const data = await response.json();
        setRecommendedProducts(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Empfehlungen:', error);
      }
    };

    fetchRecommendations();
  }, []);

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

          <nav>
            <ul className={`sm:flex ${isOpen ? 'block' : 'hidden'} space-x-6`}>

              {['about', 'Shop', 'Beratung'].map((text, idx) => (
                <li key={idx}>
                  <Link

                    href={idx === 3 ? '/#contact' : `/${text.toLowerCase().replace(' ', '')}`}

                    className="hover:underline hover:text-red-500 font-semibold tracking-wide transition duration-300"
                  >

                    {text}
                  </Link>
                </li>

              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section

        className="bg-cover bg-center text-white py-20 text-center relative transition-all duration-500 transform hover:scale-105"

        style={{

          backgroundImage:

            'url(https://images.prismic.io/herohealth/ZvvkVLVsGrYSwN5v_veggies.jpeg?auto=format%2Ccompress&fit=max&w=4000&h=1957)',

        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative container mx-auto">
          <h2 className="text-5xl font-extrabold mb-4 text-white tracking-wide">

            SW<span className="text-red-600">I</span>SS <span className="text-red-600">SUPPLEMENTS</span>
          </h2>
          <p className="text-lg mb-6 text-gray-200">

            Erleben Sie die Zukunft der gesunden Ernährung mit Swiss Supplements.
          </p>
          <Link href="/about">
            <button className="mt-6 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">

              Mehr erfahren
            </button>
          </Link>
        </div>
      </section>

      {/* Produkte */}
      <section id="products" className="bg-[#2a2a2a] py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6 text-white">

            Unsere Empfehlungen
            <span className="text-xs text-white bg-red-600 py-1 px-2 rounded-full inline-block ml-2">

              Favoriten
            </span>
          </h3>
          <p className="text-gray-400 mb-6">

            Entdecken Sie unser Sortiment an hochwertigen, nachhaltigen Produkten.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

            {recommendedProducts.map((product) => (
              <div

                key={product.id}

                className="bg-[#1e1e1e] shadow-lg rounded-lg p-6 hover:scale-105 transform transition duration-500 hover:shadow-xl"
              >
                <div className="relative mb-4">
                  <Image

                    src={product.image}

                    alt={product.title}

                    width={500}

                    height={300}

                    className="object-cover rounded-lg w-full h-64 transition-transform duration-500 ease-in-out hover:scale-110"

                  />
                </div>
                <h4 className="text-xl font-bold mb-2 text-white">{product.title}</h4>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <p className="text-red-500 text-xl font-bold">{product.price} CHF</p>
                <Link href={`/shop/${product.id}`}>
                  <button className="mt-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">

                    Abo abschliessen
                  </button>
                </Link>
              </div>

            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="contact" className="py-16 bg-[#1c1c1c]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6 text-white">Beratung</h3>
          <p className="text-gray-400 mb-4">

            Persönliche Beratung zu Nährwerten oder Fragen? Melden Sie sich bei uns.
          </p>
          <a

            href="mailto:info@healthyfood3000.com"

            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300 transform hover:scale-105"
          >

            Email senden
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4 text-center text-sm tracking-wide">
          &copy; 2024 Swiss Supplements. Alle Rechte vorbehalten.
        </div>
      </footer>
    </div>

  );


}
