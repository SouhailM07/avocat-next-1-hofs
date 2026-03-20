"use client";
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const { lang, dir, t } = useLanguage();

  return (
    <section id="contact" className="bg-white py-32 overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold font-bold uppercase tracking-[0.3em] text-xs mb-3">
              {lang === 'ar' ? 'تواصل معنا' : 'Contactez-nous'}
            </p>
            <h2 className="text-5xl md:text-6xl text-primary leading-tight lowercase mb-8">
              {t.nav.contact}
            </h2>
            <div className="w-16 h-1 bg-gold/50 mb-10" />
            <p className="text-xl text-gray-500 font-light italic mb-16 max-w-lg leading-relaxed">
              {lang === 'ar' ? 'نحن هنا للإجابة على جميع استفساراتكم القانونية. لا تترددوا في الاتصال بنا لحجز موعد أو للحصول على استشارة.' : 'Nous sommes là pour répondre à toutes vos questions juridiques. N\'hésitez pas à nous contacter pour prendre rendez-vous ou pour obtenir une consultation.'}
            </p>
            
            <div className="flex flex-col gap-10">
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 bg-primary flex items-center justify-center text-gold shrink-0 transition-transform duration-500 group-hover:scale-110">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-serif italic text-2xl mb-2 text-primary">{lang === 'ar' ? 'الموقع' : 'Localisation'}</h4>
                  <p className="text-gray-500 font-light text-lg">{lang === 'ar' ? '56 شارع الإخوة رتال بوفاريك 09400' : '56 rue des freres rettal boufarik 09400'}</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 bg-primary flex items-center justify-center text-gold shrink-0 transition-transform duration-500 group-hover:scale-110">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-serif italic text-2xl mb-2 text-primary">{lang === 'ar' ? 'الهاتف' : 'Ligne Directe'}</h4>
                  <p className={`text-gray-500 font-light text-lg ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir="ltr">0793704284</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 bg-primary flex items-center justify-center text-gold shrink-0 transition-transform duration-500 group-hover:scale-110">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-serif italic text-2xl mb-2 text-primary">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</h4>
                  <p className="text-gray-500 font-light text-lg">mahifares2@gmail.com</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 bg-primary flex items-center justify-center text-gold shrink-0 transition-transform duration-500 group-hover:scale-110">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-serif italic text-2xl mb-2 text-primary">{lang === 'ar' ? 'الساعات' : 'Horaires'}</h4>
                  <p className="text-gray-500 font-light text-lg">{lang === 'ar' ? 'الأحد - الخميس: 09:00 - 17:00' : 'Dimanche - Jeudi: 09h00 - 17h00'}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-12 md:p-16 border border-gray-100 flex flex-col justify-center"
          >
            <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{lang === 'ar' ? 'الاسم الكامل' : 'Nom Complet'}</label>
                  <input type="text" className="py-4 bg-transparent border-b-2 border-gray-200 outline-none focus:border-gold transition-colors text-lg" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input type="email" className="py-4 bg-transparent border-b-2 border-gray-200 outline-none focus:border-gold transition-colors text-lg" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{lang === 'ar' ? 'الموضوع' : 'Objet de la demande'}</label>
                <input type="text" className="py-4 bg-transparent border-b-2 border-gray-200 outline-none focus:border-gold transition-colors text-lg" />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
                <textarea rows={4} className="py-4 bg-transparent border-b-2 border-gray-200 outline-none focus:border-gold transition-colors text-lg resize-none"></textarea>
              </div>
              <button className="group btn-primary !bg-primary !text-white hover:!bg-gold hover:!text-primary !py-5 !justify-center !text-sm !font-bold !uppercase !tracking-[0.4em] mt-6 flex items-center gap-4">
                {lang === 'ar' ? 'إرسال الاستفسار' : 'Envoyer la demande'}
                <Send size={18} className={`transition-transform ${dir === 'rtl' ? 'scale-x-[-1] group-hover:-translate-x-1' : 'group-hover:translate-x-1'} group-hover:-translate-y-1`} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
