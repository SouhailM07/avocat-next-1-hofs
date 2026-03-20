"use client";
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';
import { Scale, Users, Gavel, Briefcase, FileText, ChevronRight, ChevronLeft } from 'lucide-react';

const Services = () => {
  const { lang, dir, t } = useLanguage();

  const serviceIcons = [
    <FileText size={40} strokeWidth={1.5} />,
    <Users size={40} strokeWidth={1.5} />,
    <Gavel size={40} strokeWidth={1.5} />,
    <Briefcase size={40} strokeWidth={1.5} />,
    <Scale size={40} strokeWidth={1.5} />,
  ];

  return (
    <section id="services" className="bg-gray-50 py-32 overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-3">
              {lang === 'ar' ? 'ماذا نقدم؟' : 'Nos Domaines'}
            </p>
            <h2 className="text-5xl md:text-6xl text-primary leading-tight lowercase">
              {t.services.title}
            </h2>
            <div className="w-16 h-1 bg-gold/50 my-8" />
            <p className="text-xl text-gray-500 font-light italic">
              {lang === 'ar' ? 'نقدم مجموعة واسعة من الخدمات القانونية بمهنية عالية ودقة متناهية.' : 'Nous offrons une large gamme de services juridiques avec un haut professionnalisme et une rigueur extrême.'}
            </p>
          </motion.div>
          
          <motion.a 
            href="#contact"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="btn-secondary !border-primary !text-primary hover:!bg-primary hover:!text-white rounded-none px-12 py-5"
          >
            {lang === 'ar' ? 'طلب استشارة' : 'Demander une consultation'}
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-200">
          {t.services.items.map((service: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-12 border-r border-b border-gray-200 group hover:bg-primary transition-all duration-500"
            >
              <div className="text-gold mb-10 group-hover:text-white transition-colors duration-500">
                {serviceIcons[i] || <Scale size={40} strokeWidth={1.5} />}
              </div>
              <h3 className="text-3xl mb-6 group-hover:text-white transition-colors duration-500 lowercase font-serif italic">{service}</h3>
              <p className="text-gray-500 group-hover:text-white/60 transition-colors duration-500 mb-10 leading-relaxed font-light">
                 {lang === 'ar' ? 'نقدم استشارات دفاعية وتمثيلاً قانونياً متكاملاً لضمان حقوقكم.' : 'Nous fournissons des conseils de défense et une représentation juridique complète pour garantir vos droits.'}
              </p>
              <div className="flex items-center gap-3 text-gold font-bold group-hover:text-white transition-colors duration-500 cursor-pointer">
                 <span className="uppercase tracking-widest text-xs">{lang === 'ar' ? 'المزيد' : 'Détails'}</span>
                 {dir === 'rtl' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
