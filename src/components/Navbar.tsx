"use client";
import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Menu, X, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { lang, dir, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.contact, href: '#contact' },
  ];

  // Dynamic styling based on scroll state
  const bgClass = scrolled 
    ? 'bg-white py-3 shadow-lg border-b border-gray-100' 
    : 'bg-black/20 backdrop-blur-xl border-b border-white/10 py-5'; // True transparent glass over dark hero
  
  const textClass = scrolled ? 'text-primary' : 'text-white';
  const logoTextClass = scrolled ? 'text-primary' : 'text-white';
  const iconClass = scrolled ? 'text-primary' : 'text-white';
  const buttonBorderClass = scrolled ? 'border-primary text-primary hover:bg-primary hover:text-white' : 'border-white/50 text-white hover:bg-white hover:text-primary';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${bgClass}`}>
      <div className="container flex justify-between items-center px-4 md:px-6">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 shrink-0"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gold flex items-center justify-center rounded text-white shadow-sm text-sm md:text-base">⚖️</div>
          <span className={`text-xl md:text-2xl font-serif font-black tracking-tighter uppercase transition-colors duration-300 ${logoTextClass}`}>
            {lang === 'ar' ? 'ماحي فارس' : 'MAHI FARES'}
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`text-sm font-bold uppercase tracking-[0.2em] transition-all hover:text-gold ${textClass}`}
            >
              {link.name}
            </motion.a>
          ))}
        </div>
        
        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center shrink-0">
          <button 
            onClick={toggleLanguage}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-black uppercase tracking-widest border-2 rounded transition-all duration-300 ${buttonBorderClass}`}
          >
            <Globe size={16} />
            {lang === 'ar' ? 'FR' : 'AR'}
          </button>
        </div>

        {/* Mobile Toggle Controls */}
        <div className="lg:hidden flex items-center gap-3 shrink-0">
           <button onClick={toggleLanguage} className={`p-2 transition-colors hover:text-gold ${iconClass}`}>
            <Globe size={22} />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className={`p-2 transition-colors hover:text-gold ${iconClass}`}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden absolute top-full left-0 w-full overflow-hidden shadow-2xl border-t ${scrolled ? 'bg-white border-gray-100' : 'bg-[#0B1F3A]/98 backdrop-blur-2xl border-white/10'}`}
          >
            <div className="container py-4 flex flex-col">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-serif italic py-4 border-b flex justify-between items-center transition-colors hover:text-gold ${
                    scrolled ? 'text-primary border-gray-100' : 'text-white border-white/10'
                  } ${i === navLinks.length - 1 ? 'border-b-0' : ''}`}
                >
                  {link.name}
                  {dir === 'rtl' ? <ArrowLeft size={16} className="text-gold" /> : <ArrowRight size={16} className="text-gold" />}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
