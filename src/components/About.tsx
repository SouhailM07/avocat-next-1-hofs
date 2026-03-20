"use client";
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const About = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="about" className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-20 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="relative"
        >
          <div className="mb-8">
             <p className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-3">
                {lang === 'ar' ? 'من هو الأستاذ؟' : 'Qui est Maître?'}
             </p>
             <h2 className="text-5xl md:text-6xl text-primary leading-tight lowercase">
                {t.about.title}
             </h2>
          </div>
          
          <div className="w-16 h-1.5 bg-gold/50 mb-10" />
          
          <p className="text-xl text-gray-600 mb-12 leading-[1.8] font-light italic">
            "{t.about.content}"
          </p>
          
          <div className="grid grid-cols-2 gap-10">
            <div className="border-l-2 border-gold/20 pl-6 py-2">
               <p className="text-3xl font-serif font-bold text-primary">15+</p>
               <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{lang === 'ar' ? 'سنة خبرة' : 'Ans d\'expérience'}</p>
            </div>
            <div className="border-l-2 border-gold/20 pl-6 py-2">
               <p className="text-3xl font-serif font-bold text-primary">500+</p>
               <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{lang === 'ar' ? 'قضية ناجحة' : 'Affaires réussies'}</p>
            </div>
          </div>

          <div className="mt-16 flex items-center gap-4 text-primary font-bold">
             <MapPin size={24} className="text-gold" />
             <span className="text-lg tracking-tight">{lang === 'ar' ? 'بوفاريك، البليدة' : 'Boufarik, Blida'}</span>
          </div>
        </motion.div>
        
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="relative group"
        >
           <div className="aspect-[4/5] relative z-10 overflow-hidden shadow-[40px_40px_0px_0px_#C8A96A33]">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" 
                alt="Law Scale" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
              />
           </div>
           
           <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-gold/20 -z-0 pointer-events-none" />
           <div className="absolute -bottom-10 -left-10 w-40 h-40 border-2 border-gold/20 -z-0 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
