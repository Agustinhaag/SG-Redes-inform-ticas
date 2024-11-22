import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/redux/Provider";
import { AuthProvider } from "@/redux/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SG-Redes",
  description: "Envio de mensajes masivos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-cover"
        style={{ backgroundImage: "url(/files/fondoazul2.jpg)" }}
      >
        <Providers>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
