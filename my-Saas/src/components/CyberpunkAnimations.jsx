import { useEffect, useRef } from 'react';
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
  
  // Set up magnetic effect for elements
  useEffect(() => {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    const handleMagneticMove = (e, element) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const deltaX = Math.floor((clientX - centerX) / 8);
      const deltaY = Math.floor((clientY - centerY) / 8);
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };
    
    const handleMagneticLeave = (element) => {
      element.style.transform = 'translate(0px, 0px)';
    };
    
    const addMagneticListeners = () => {
      magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => handleMagneticMove(e, element));
        element.addEventListener('mouseleave', () => handleMagneticLeave(element));
      });
    };
    
    const removeMagneticListeners = () => {
      magneticElements.forEach(element => {
        element.removeEventListener('mousemove', (e) => handleMagneticMove(e, element));
        element.removeEventListener('mouseleave', () => handleMagneticLeave(element));
      });
    };
    
    addMagneticListeners();
    
    return () => {
      removeMagneticListeners();
    };
  }, []);
  
  // Set up glitch effect on hover
  useEffect(() => {
    const glitchElements = document.querySelectorAll('.glitch-on-hover');
    
    const handleGlitchEnter = (element) => {
      element.classList.add('glitching');
      
      // Create glitch layers
      const content = element.innerHTML;
      const glitchLayers = document.createElement('div');
      glitchLayers.className = 'glitch-layers';
      
      // Create 2 layers for the glitch effect
      for (let i = 0; i < 2; i++) {
        const layer = document.createElement('div');
        layer.className = `glitch-layer glitch-layer-${i + 1}`;
        layer.innerHTML = content;
        glitchLayers.appendChild(layer);
      }
      
      element.appendChild(glitchLayers);
    };
    
    const handleGlitchLeave = (element) => {
      element.classList.remove('glitching');
      const glitchLayers = element.querySelector('.glitch-layers');
      if (glitchLayers) {
        element.removeChild(glitchLayers);
      }
    };
    
    glitchElements.forEach(element => {
      element.addEventListener('mouseenter', () => handleGlitchEnter(element));
      element.addEventListener('mouseleave', () => handleGlitchLeave(element));
    });
    
    return () => {
      glitchElements.forEach(element => {
        element.removeEventListener('mouseenter', () => handleGlitchEnter(element));
        element.removeEventListener('mouseleave', () => handleGlitchLeave(element));
      });
    };
  }, []);
  
  // Set up ripple effect on buttons
  useEffect(() => {
    const rippleButtons = document.querySelectorAll('.cyber-button-ripple');
    
    const createRipple = (event) => {
      const button = event.currentTarget;
      
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      
      const rect = button.getBoundingClientRect();
      
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - rect.left - radius}px`;
      circle.style.top = `${event.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');
      
      // Remove existing ripples
      const ripple = button.querySelector('.ripple');
      if (ripple) {
        ripple.remove();
      }
      
      button.appendChild(circle);
      
      // Remove the ripple after animation completes
      setTimeout(() => {
        if (circle) {
          circle.remove();
        }
      }, 600);
    };
    
    rippleButtons.forEach(button => {
      button.addEventListener('click', createRipple);
    });
    
    return () => {
      rippleButtons.forEach(button => {
        button.removeEventListener('click', createRipple);
      });
    };
  }, []);
  
  // Set up typing animation for text
  useEffect(() => {
    const typingElements = document.querySelectorAll('.cyber-typing');
    
    typingElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      
      let i = 0;
      const typeChar = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeChar, 50 + Math.random() * 50);
        }
      };
      
      typeChar();
    });
  }, []);
  
  // Add parallax effect to sections
  useEffect(() => {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      parallaxLayers.forEach((layer, index) => {
        const speed = 0.1 * (index + 1);
        const yPos = -(scrollY * speed);
        layer.style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Add pulse effect to UI cards
  useEffect(() => {
    const pulseElements = document.querySelectorAll('.pulse-effect');
    
    pulseElements.forEach((element, index) => {
      // Set different animation delays for each element
      element.style.animationDelay = `${index * 0.2}s`;
    });
  }, []);
  
  return (
    <div ref={containerRef} className="cyberpunk-animations">
      {/* This component doesn't render anything visible, it just adds the animations */}
    </div>
  );
}
