import { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * CyberpunkAnimations - A component that adds cyberpunk-style UI animations
 * Includes:
 * - Magnetic cursor interactions
 * - Floating AI orb that follows cursor
 * - Electric trail on scroll
 * - Scroll-triggered fade-in animations
 * - Circuit path connections
 */
export default function CyberpunkAnimations() {
  const containerRef = useRef(null);
  
  // Set up magnetic effect with direct DOM manipulation for zero delay
  useEffect(() => {
    // Direct DOM manipulation for instant magnetic effect
    const handleMouseMove = (e) => {
      // Use document.elementsFromPoint for better performance than closest()
      const x = e.clientX;
      const y = e.clientY;
      const elements = document.elementsFromPoint(x, y);
      
      // Find magnetic element under cursor
      const magneticElement = elements.find(el => el.classList.contains('magnetic'));
      
      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Immediate response with minimal calculation
        const deltaX = (x - centerX) / 4; // Even faster response (from 6 to 4)
        const deltaY = (y - centerY) / 4;
        
        // Apply transform directly
        magneticElement.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      }
    };
    
    // Reset transform when mouse leaves
    const handleMouseLeave = (e) => {
      const magneticElement = e.target.closest('.magnetic');
      if (magneticElement) {
        magneticElement.style.transform = 'translate(0px, 0px)';
      }
    };
    
    // Add event listeners to document instead of each element
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);
  
  // Set up simplified glitch effect on hover with event delegation
  useEffect(() => {
    // Pre-create and cache the glitch layers to avoid creating DOM elements on hover
    const glitchLayersTemplate = document.createElement('div');
    glitchLayersTemplate.className = 'glitch-layers';
    
    // Create only 1 layer instead of 2 to reduce DOM elements
    const layer = document.createElement('div');
    layer.className = 'glitch-layer glitch-layer-1';
    glitchLayersTemplate.appendChild(layer);
    
    // Use event delegation for better performance
    const handleMouseEnter = (e) => {
      const glitchElement = e.target.closest('.glitch-on-hover');
      if (!glitchElement || glitchElement.querySelector('.glitch-layers')) return;
      
      glitchElement.classList.add('glitching');
      
      // Clone the template instead of creating new elements each time
      const glitchLayersClone = glitchLayersTemplate.cloneNode(true);
      const layerClone = glitchLayersClone.querySelector('.glitch-layer');
      layerClone.textContent = glitchElement.textContent; // Use textContent instead of innerHTML for better performance
      
      glitchElement.appendChild(glitchLayersClone);
    };
    
    const handleMouseLeave = (e) => {
      const glitchElement = e.target.closest('.glitch-on-hover');
      if (!glitchElement) return;
      
      glitchElement.classList.remove('glitching');
      const glitchLayers = glitchElement.querySelector('.glitch-layers');
      if (glitchLayers) {
        glitchElement.removeChild(glitchLayers);
      }
    };
    
    // Add event listeners to document instead of each element
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);
  
  // Set up ripple effect on buttons with event delegation
  useEffect(() => {
    // Pre-create a single reusable ripple element
    const rippleElement = document.createElement('span');
    rippleElement.classList.add('ripple');
    document.body.appendChild(rippleElement);
    
    // Use event delegation for better performance
    const handleClick = (event) => {
      const button = event.target.closest('.cyber-button-ripple');
      if (!button) return;
      
      // Reuse the ripple element instead of creating new ones
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      const rect = button.getBoundingClientRect();
      
      rippleElement.style.width = rippleElement.style.height = `${diameter}px`;
      rippleElement.style.left = `${event.clientX - rect.left - radius}px`;
      rippleElement.style.top = `${event.clientY - rect.top - radius}px`;
      
      // Move the ripple element to the button
      button.appendChild(rippleElement);
      
      // Trigger animation by removing and adding the class
      rippleElement.classList.remove('ripple-animate');
      // Force reflow
      void rippleElement.offsetWidth;
      rippleElement.classList.add('ripple-animate');
      
      // Move the ripple back to body after animation
      setTimeout(() => {
        document.body.appendChild(rippleElement);
      }, 600);
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
      if (document.body.contains(rippleElement)) {
        document.body.removeChild(rippleElement);
      }
    };
  }, []);
  
  // Set up typing animation for text with reduced frequency
  useEffect(() => {
    const typingElements = document.querySelectorAll('.cyber-typing');
    
    // Limit the number of elements that get the typing effect
    const maxTypingElements = 3;
    const elementsToAnimate = Array.from(typingElements).slice(0, maxTypingElements);
    
    elementsToAnimate.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      
      // Store the full text as a data attribute instead of using closure
      element.dataset.fullText = text;
      
      // Add to animation queue instead of starting all animations at once
      setTimeout(() => {
        let i = 0;
        const typeChar = () => {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            // Increased delay between characters to reduce CPU usage
            setTimeout(typeChar, 80); // Fixed delay instead of random
          }
        };
        
        typeChar();
      }, Math.random() * 1000); // Stagger start times
    });
  }, []);
  
  // Add parallax effect to sections with throttling
  useEffect(() => {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    // Skip parallax if there are too many layers (performance optimization)
    if (parallaxLayers.length > 10) {
      console.log('Too many parallax layers, disabling parallax for performance');
      return;
    }
    
    // Throttle scroll handler to improve performance
    let lastScrollTime = 0;
    let ticking = false;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const now = Date.now();
      
      // Only process scroll events at most every 16ms (~ 60fps)
      if (now - lastScrollTime < 16) {
        return;
      }
      
      lastScrollTime = now;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          parallaxLayers.forEach((layer, index) => {
            // Reduce parallax effect intensity
            const speed = 0.05 * (index + 1); // Reduced from 0.1
            const yPos = -(scrollY * speed);
            layer.style.transform = `translateY(${yPos}px)`;
          });
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Add pulse effect to UI cards with reduced intensity
  useEffect(() => {
    const pulseElements = document.querySelectorAll('.pulse-effect');
    
    // Limit the number of pulse elements for performance
    const maxPulseElements = 5;
    const elementsToAnimate = Array.from(pulseElements).slice(0, maxPulseElements);
    
    elementsToAnimate.forEach((element, index) => {
      // Increase delay between animations to reduce simultaneous animations
      element.style.animationDelay = `${index * 0.5}s`; // Increased from 0.2s to 0.5s
      // Reduce animation duration for better performance
      element.style.animationDuration = '3s'; // Set a fixed, longer duration
    });
  }, []);
  
  return (
    <div ref={containerRef} className="cyberpunk-animations">
      {/* This component doesn't render anything visible, it just adds the animations */}
    </div>
  );
}
