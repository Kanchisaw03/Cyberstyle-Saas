import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden cyber-section">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />
      
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      {/* Circuit flow animation */}
      <div className="absolute inset-0 circuit-flow opacity-30"></div>
      
      {/* Scanline effect */}
      <div className="absolute inset-0 scanline opacity-20"></div>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6 cyber-glitch-text"
            data-text="Ready to Transform Your Business?"
          >
            Ready to Transform Your Business?
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Join thousands of businesses already using our platform to scale their operations and drive growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.7)",
                textShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-purple-500/25 cyber-button relative overflow-hidden"
            >
              <span className="relative z-10">Start Free Trial</span>
              <span className="absolute inset-0 cyber-button-glow"></span>
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
                textShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors border border-white/20 cyber-button-secondary relative overflow-hidden"
            >
              <span className="relative z-10">Schedule Demo</span>
              <span className="absolute inset-0 cyber-button-glow-secondary"></span>
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 text-gray-400"
          >
            No credit card required • 14-day free trial • Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA; 