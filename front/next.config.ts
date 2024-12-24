import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/device/reset-qr-code/:serial", // Ruta de la API que quieres manejar
        destination: "https://deu.wablas.com/api/device/reset-qr-code/:serial", // API externa
      },
      {
        source: "/api/device/qr-code/:serial",
        destination: "https://deu.wablas.com/api/device/qr-code/:serial", // API externa
      },
    ];
  },
};

export default nextConfig;
