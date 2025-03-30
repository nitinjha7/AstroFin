"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/landing-page/Navbar";
import HeroSection from "@/components/landing-page/HeroSection";
import Feature from "@/components/landing-page/Feature";
import Footer from "@/components/landing-page/Footer";
import CTASection from "@/components/landing-page/CTASection";

export default function Home() {




  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-gray-100 text-gray-900 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Feature />
      <CTASection />
      <Footer />
      
    </div>
  );
}