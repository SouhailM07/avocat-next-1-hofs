"use client";
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Scale, Users, Gavel, Briefcase, FileText, ChevronRight, ChevronLeft } from 'lucide-react';

const Services = () => {
  const t = useTranslations();
  const locale = useLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const serviceIcons = [
    <FileText size={40} strokeWidth={1.5} />,
    <Users size={40} strokeWidth={1.5} />,
    <Gavel size={40} strokeWidth={1.5} />,
    <Briefcase size={40} strokeWidth={1.5} />,
    <Scale size={40} strokeWidth={1.5} />,
  ];

  // Get items as an array
  const items = t.raw('services.items') as string[];

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
              {t('services.subtitle')}
            </p>
            <h2 className="text-5xl md:text-6xl text-primary leading-tight lowercase">
              {t('services.title')}
            </h2>
            <div className="w-16 h-1 bg-gold/50 my-8" />
            <p className="text-xl text-gray-500 font-light italic">
              {t('services.description')}
            </p>
          </motion.div>
          
          <motion.a 
            href="#contact"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="btn-secondary !border-primary !text-primary hover:!bg-primary hover:!text-white rounded-none px-12 py-5"
          >
            {t('common.consultation')}
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-200">
          {items.map((service: string, i: number) => (
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
                 {t('services.item_description')}
              </p>
              <div className="flex items-center gap-3 text-gold font-bold group-hover:text-white transition-colors duration-500 cursor-pointer">
                 <span className="uppercase tracking-widest text-xs">{t('common.more')}</span>
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
