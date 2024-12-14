"use client";
import Banner from "@/components/landing/Banner";
import HomeAbout from "@/components/landing/HomeAbout";
import SgHome from "@/components/landing/SgHome";

export default function Home() {
  return (
    <main className="text-custom-white">
      <SgHome />
      <Banner />
      <HomeAbout />
    </main>
  );
}
