import { motion } from "framer-motion";
import { DollarSign, PieChart, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";


const Feature = () => {
    const stagger = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

  return (
    <div>
        <section id="features" className="py-20 md:py-32 bg-white/50 relative">
        <div className="container mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Why AstraFin?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-xl mx-auto">
              Advanced tools to simplify your financial life.
            </motion.p>
          </motion.div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: DollarSign,
                title: "Smart Budgeting",
                desc: "Real-time tracking with predictive analytics to keep your spending in check."
              },
              {
                icon: PieChart,
                title: "Insightful Analytics",
                desc: "Visualize your finances with AI-powered insights and trends."
              },
              {
                icon: TrendingUp,
                title: "Investment Growth",
                desc: "Tailored strategies to maximize returns with minimal risk."
              },
              {
                icon: Shield,
                title: "Bank-Grade Security",
                desc: "Your data is protected with state-of-the-art encryption."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-indigo-100/50"
              >
                <feature.icon className="h-10 w-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Feature