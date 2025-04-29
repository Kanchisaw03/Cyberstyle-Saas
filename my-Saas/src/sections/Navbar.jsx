import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navbarRef = useRef(null);
  
  // Parallax effect for the navbar background
  const backgroundY = useTransform(scrollY, [0, 100], [0, 10]);
  const opacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const blurStrength = useTransform(scrollY, [0, 100], [10, 25]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0.15, 0.1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.3, 0.6]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interactive effect - navbar reacts to mouse movement
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;
    
    const handleMouseMove = (e) => {
      if (!navbar) return;
      
      const { left, top, width, height } = navbar.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      // Calculate position relative to the center
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Calculate the distance from center (normalized)
      const distanceX = (x - centerX) / centerX;
      const distanceY = (y - centerY) / centerY;
      
      // Apply subtle gradient shift based on mouse position
      navbar.style.setProperty('--x-position', `${50 + distanceX * 10}%`);
      navbar.style.setProperty('--y-position', `${50 + distanceY * 10}%`);
      
      // Apply subtle shadow shift
      const shadowX = distanceX * 5;
      const shadowY = distanceY * 5;
      navbar.style.setProperty('--shadow-x', `${shadowX}px`);
      navbar.style.setProperty('--shadow-y', `${shadowY}px`);
    };
    
    const handleMouseLeave = () => {
      // Reset to default
      navbar.style.setProperty('--x-position', '50%');
      navbar.style.setProperty('--y-position', '50%');
      navbar.style.setProperty('--shadow-x', '0px');
      navbar.style.setProperty('--shadow-y', '0px');
    };
    
    navbar.addEventListener('mousemove', handleMouseMove);
    navbar.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      navbar.removeEventListener('mousemove', handleMouseMove);
      navbar.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      ref={navbarRef}
      style={{ y: backgroundY, opacity }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          style={{
            backdropFilter: `blur(${blurStrength.get()}px)`,
            backgroundColor: `rgba(8, 13, 39, ${bgOpacity.get()})`,
            borderColor: `rgba(0, 240, 255, ${borderOpacity.get()})`,
            boxShadow: `0 8px 32px rgba(0, 240, 255, 0.2)`
          }}
          className="glassmorphism-navbar cyber-card-border rounded-xl border shadow-lg group relative"
        >
          {/* Motion gradient effect from feature cards */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/10 to-[#0051ff]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          {/* Bottom gradient line effect */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
          
          {/* Cyberpunk scanline effect */}
          <div className="scanline"></div>
          
          {/* Circuit pattern overlay with animation */}
          <div className="circuit-overlay"></div>
          
          {/* Horizontal flow effect */}
          <div className="circuit-flow"></div>
          
          {/* Glitch effect container */}
          <div className="glitch-effect"></div>
          <div className="flex items-center justify-between p-4">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] to-[#0051ff]">
                NEURO.SYNC
              </span>
              <div className="ml-2 w-2 h-2 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#0051ff] animate-pulse" />
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-[#00f0ff] transition-colors duration-300 text-sm font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00f0ff] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <button className="cyber-button-ripple px-4 py-2 rounded-md text-sm">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-5">
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                      isMobileMenuOpen
                        ? "rotate-45 translate-y-2.5"
                        : "translate-y-0"
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                      isMobileMenuOpen
                        ? "-rotate-45 -translate-y-2.5"
                        : "translate-y-5"
                    }`}
                    style={{ bottom: 0 }}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-[#00f0ff]/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-[#00f0ff] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                ))}
                <button className="cyber-button-ripple w-full mt-4 px-4 py-2 rounded-md text-sm">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;