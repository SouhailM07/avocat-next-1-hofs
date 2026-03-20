"use client";
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Phone } from 'lucide-react';

const Hero = () => {
  const { dir, t } = useLanguage();

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-primary">
      {/* Background Image with Layered Overlays */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 transform scale-105"
        style={{ 
          backgroundImage: 'url("/assets/legal_hero_bg.webp")',
        }}
      />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-primary/95 via-primary/60 to-transparent" />
      <div className="absolute inset-0 z-1 bg-black/20" />
      
      {/* Content */}
      <div className="container relative z-10 px-6 sm:px-12">
        <div className="max-w-3xl">
          <motion.div
             initial={{ opacity: 0, scaleX: 0 }}
             animate={{ opacity: 1, scaleX: 1 }}
             transition={{ duration: 1 }}
             className="w-16 h-1 bg-gold mb-10 origin-left"
          />
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-8xl mb-6 sm:mb-8 text-white leading-[1.1] font-serif tracking-tight"
          >
            {t.hero.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-gold mb-4 italic font-medium break-words"
          >
            {t.hero.subtitle}
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-12 max-w-xl leading-relaxed"
          >
            {t.hero.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-5"
          >
            <a href="#contact" className="group btn-primary px-6 py-4 md:px-10 md:py-5 bg-gold hover:bg-white text-primary rounded-none font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3 w-full sm:w-auto">
              {t.hero.cta_primary}
              {dir === 'rtl' ? <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> : <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
            </a>
            <a href="tel:0793704284" className="btn-secondary px-6 py-4 md:px-10 md:py-5 border-white/30 text-white rounded-none font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-3 hover:bg-white/10 w-full sm:w-auto">
              <Phone size={18} />
              {t.hero.cta_secondary}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Branding */}
      <div className="absolute bottom-12 right-12 hidden lg:block opacity-20 transform rotate-90 origin-right">
        <p className="text-white text-8xl font-serif font-black uppercase tracking-tighter">LEGAL PRACTICE</p>
      </div>
    </section>
  );
};

export default Hero;
