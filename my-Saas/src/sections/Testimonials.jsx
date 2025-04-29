import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    image: "https://i.pravatar.cc/150?img=1",
    content: "This platform has transformed how we manage our business. The automation features alone have saved us countless hours.",
  },
  {
    name: "Michael Chen",
    role: "CTO, InnovateCorp",
    image: "https://i.pravatar.cc/150?img=2",
    content: "The analytics dashboard provides insights we never had before. It's like having a crystal ball for our business decisions.",
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director, GrowthLabs",
    image: "https://i.pravatar.cc/150?img=3",
    content: "The team collaboration features have made remote work seamless. Our productivity has increased significantly.",
  },
];

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.5 }}
      className={`relative ${
        isActive ? "z-10" : "z-0"
      } bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 cyber-card`}
    >
      <div className="flex flex-col items-center text-center relative">
        {/* Scanline effect */}
        <div className="scanline absolute inset-0 opacity-30"></div>
        
        {/* Circuit pattern overlay */}
        <div className="circuit-overlay absolute inset-0 opacity-20"></div>
        
        <motion.div
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(138, 43, 226, 0.8)" }}
          className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-purple-500/50 relative cyber-glow"
        >
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-lg mb-6 italic cyber-text">"{testimonial.content}"</motion.p>
        <motion.h4 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white font-semibold text-xl mb-1 cyber-glow">{testimonial.name}</motion.h4>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-purple-400 cyber-text-secondary">{testimonial.role}</motion.p>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    controls.start({
      x: [0, 10, -10, 0],
      transition: { duration: 0.5 }
    });
  }, [activeIndex, controls]);

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden cyber-section">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />
      
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      {/* Animated orbs */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 30, -30, 0],
          scale: [1, 1.2, 0.8, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -70, 70, 0],
          y: [0, -50, 50, 0],
          scale: [1, 0.8, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See what our customers have to say about their experience with our platform.
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex justify-center items-center gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`w-full max-w-md ${
                  index === activeIndex ? "block" : "hidden md:block"
                }`}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={index === activeIndex}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex
                    ? "bg-purple-500 cyber-glow"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 