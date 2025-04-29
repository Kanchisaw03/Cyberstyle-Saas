import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Neural Processing",
    description: "Advanced neural network processing for enhanced cognitive performance.",
    icon: "🧠",
  },
  {
    title: "Quantum Algorithms",
    description: "Harness the power of quantum computing for complex problem-solving.",
    icon: "⚛️",
  },
  {
    title: "Secure Neural Link",
    description: "Military-grade encryption protects your neural data transfers.",
    icon: "🔒",
  },
  {
    title: "Collective Intelligence",
    description: "Connect with the global neural network for collaborative insights.",
    icon: "🌐",
  },
  {
    title: "Synthetic Integration",
    description: "Seamlessly integrate with your existing digital ecosystem.",
    icon: "🔄",
  },
  {
    title: "24/7 Neural Support",
    description: "AI-powered support system continuously monitors your neural activity.",
    icon: "🤖",
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#080d27]/70 backdrop-blur-lg rounded-xl p-6 border border-[#00f0ff]/20 cyber-card-border hover:border-[#00f0ff]/50 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/10 to-[#0051ff]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="text-4xl mb-4">{feature.icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
        <p className="text-gray-400">{feature.description}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
    </motion.div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-20 relative overflow-hidden">
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
              Neural Enhancement Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of cognitive enhancement with our cutting-edge neural interface technology.
          </p>
          <div className="cyber-divider w-24 h-1 mx-auto mt-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;