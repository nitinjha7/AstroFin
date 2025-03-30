import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const HeroSection = () => {
  return (
    <div className=''>
      <section className="relative">
        <div className="w-full h-full absolute inset-0 bg-gradient-to-r from-indigo-200/20 via-purple-200/20 to-transparent -z-10" />
        <div className=" mx-auto text-center">
          <HeroHighlight className=''>
            <motion.h1
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-900 to-purple-700 bg-clip-text text-transparent"
            >
              Elevate Your Financial Game
            </motion.h1>
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            >
              Unlock the <Highlight> power of smart budgeting </Highlight>, AI-driven insights, and secure investments—all in one sleek platform.
            </motion.p>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Start Free
                <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50">
                Learn More
              </Button>
            </motion.div>
          </HeroHighlight>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-indigo-200/50">
              <img src="/dashboard-preview.png" alt="Dashboard" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection;