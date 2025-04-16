import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

const plans = [
  {
    name: "Neural Basic",
    price: { monthly: 49, annual: 490 },
    features: [
      "Basic neural processing",
      "5 cognitive enhancement modules",
      "24/7 AI support",
      "1TB neural storage",
      "Standard encryption",
    ],
    popular: false,
  },
  {
    name: "Neural Pro",
    price: { monthly: 149, annual: 1490 },
    features: [
      "Advanced neural processing",
      "20 cognitive enhancement modules",
      "Priority neural support",
      "10TB neural storage",
      "Military-grade encryption",
      "Custom neural pathways",
      "Neural API access",
    ],
    popular: true,
  },
  {
    name: "Neural Enterprise",
    price: { monthly: 399, annual: 3990 },
    features: [
      "Unlimited neural processing",
      "All cognitive enhancement modules",
      "Dedicated neural support team",
      "Unlimited neural storage",
      "Quantum encryption",
      "Custom neural solutions",
      "Neural SLA guarantee",
      "On-premise neural deployment",
    ],
    popular: false,
  },
];

const PricingCard = ({ plan, isAnnual, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative ${
        plan.popular
          ? "bg-[#080d27]/80 border-[#00f0ff]/50 cyber-card-border"
          : "bg-[#080d27]/60 border-[#00f0ff]/20 cyber-card-corners"
      } backdrop-blur-lg rounded-2xl p-8 border hover:border-[#00f0ff]/70 transition-colors group`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-gradient-to-r from-[#00f0ff] to-[#0051ff] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-glow">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4 neon-text">{plan.name}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-white">${isAnnual ? plan.price.annual : plan.price.monthly}</span>
          <span className="text-gray-400">/{isAnnual ? "year" : "month"}</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <svg
              className="w-5 h-5 text-[#00f0ff] mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className="text-center">
        <button className="cyber-button-ripple w-full py-3 rounded-lg text-white font-medium">
          Get Started
        </button>
      </div>
      
      {/* Circuit pattern background */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-10 z-0">
        <div className="circuit-bg w-full h-full"></div>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      {/* Circuit background overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 circuit-bg opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] to-[#0051ff]">
              Neural Enhancement Plans
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect neural interface package for your cognitive enhancement needs
          </p>
          <div className="cyber-divider w-24 h-1 mx-auto mt-8"></div>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="bg-[#080d27]/50 p-1 rounded-lg border border-[#00f0ff]/20 cyber-card-border">
            <div className="flex">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  !isAnnual
                    ? "bg-gradient-to-r from-[#00f0ff]/20 to-[#0051ff]/20 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  isAnnual
                    ? "bg-gradient-to-r from-[#00f0ff]/20 to-[#0051ff]/20 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Annual <span className="text-xs text-[#00f0ff]">Save 20%</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} isAnnual={isAnnual} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;