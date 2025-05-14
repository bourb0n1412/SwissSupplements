import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'HealthyFood3000',
  description: 'Frische, gesunde Lebensmittel für eine bessere Ernährung.',
  // Favicon hinzufügen
  icons: {
    icon: './pic/logo.png', // Hier das Favicon referenzieren
  },
};

export default function RootLayout({ children }) {
  return (

    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
