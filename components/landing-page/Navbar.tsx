import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <div>
        <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-lg shadow-sm">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                >
                <img src="/logo.png" alt="AstraFin" className="h-10 w-10 rounded-full shadow-md" />
                </motion.div>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AstraFin
                </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
                {["Features", "Solutions", "Pricing", "About"].map((item) => (
                <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-105"
                >
                    {item}
                </Link>
                ))}
            </nav>
            <div className="flex items-center gap-4">
                <Link href="/login">
                    <Button variant="ghost" className="text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">
                    Login
                    </Button>
                </Link>
                
                <Link href="/register">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300">
                    Get Started
                    </Button>
                </Link>

            </div>
            </div>
        </header>
    </div>
  )
}

export default Navbar