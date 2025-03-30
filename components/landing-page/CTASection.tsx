import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link';

const CTASection = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      };

  return (
    <div>
    <section className="py-20 md:py-32 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Ready to Take Control?
          </motion.h2>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl max-w-xl mx-auto mb-8"
          >
            Join thousands of users building their financial future with AstraFin.
          </motion.p>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >

            <Link href="/register">
                <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                Get Started Now
                </Button>
            </Link>

          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CTASection