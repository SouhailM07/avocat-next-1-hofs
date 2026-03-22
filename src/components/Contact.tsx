"use client";
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { sendEmailAction, type ContactFormData } from '../app/actions/contact';

const getContactSchema = (lang: 'ar' | 'fr') => z.object({
  name: z.string().min(2, lang === 'ar' ? "الاسم يجب أن يتكون من حرفين على الأقل." : "Le nom doit comporter au moins 2 caractères."),
  email: z.string().email(lang === 'ar' ? "عنوان البريد الإلكتروني غير صالح." : "Adresse e-mail invalide."),
  subject: z.string().min(5, lang === 'ar' ? "الموضوع يجب أن يتكون من 5 أحرف على الأقل." : "Le sujet doit comporter au moins 5 caractères."),
  message: z.string().min(10, lang === 'ar' ? "الرسالة يجب أن تتكون من 10 أحرف على الأقل." : "Le message doit comporter au moins 10 caractères."),
});

const Contact = () => {
  const { lang, dir, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(getContactSchema(lang as 'ar' | 'fr')),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading(lang === 'ar' ? "جاري الإرسال" : "Envoi en cours...");
    
    try {
      const result = await sendEmailAction(data);
      if (result.success) {
        toast.success(lang === 'ar' ? "تم إرسال رسالتك بنجاح!" : "Votre message a été envoyé avec succès !", { id: loadingToast });
        reset();
      } else {
        toast.error(lang === 'ar' ? "فشل إرسال الرسالة، حاول مرة أخرى." : "Échec de l'envoi, veuillez réessayer.", { id: loadingToast });
      }
    } catch {
      toast.error(lang === 'ar' ? "حدث خطأ غير متوقع." : "Une erreur inattendue s'est produite.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-32 overflow-hidden">
      <Toaster position="bottom-center" />
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
            <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">{lang === 'ar' ? 'الاسم الكامل' : 'Nom Complet'}</label>
                  <input 
                    id="name"
                    type="text" 
                    {...register("name")}
                    className={`py-3 bg-transparent border-b-2 outline-none transition-colors text-lg ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-gold'}`} 
                  />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input 
                    id="email"
                    type="email" 
                    {...register("email")}
                    className={`py-3 bg-transparent border-b-2 outline-none transition-colors text-lg ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-gold'}`} 
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-500">{lang === 'ar' ? 'الموضوع' : 'Objet de la demande'}</label>
                <input 
                  id="subject"
                  type="text" 
                  {...register("subject")}
                  className={`py-3 bg-transparent border-b-2 outline-none transition-colors text-lg ${errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-gold'}`} 
                />
                {errors.subject && <span className="text-red-500 text-xs">{errors.subject.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
                <textarea 
                  id="message"
                  rows={4} 
                  {...register("message")}
                  className={`py-3 bg-transparent border-b-2 outline-none transition-colors text-lg resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-gold'}`}
                ></textarea>
                {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group btn-primary !bg-primary !text-white hover:!bg-gold hover:!text-primary !py-5 !justify-center !text-sm !font-bold !uppercase !tracking-[0.4em] mt-6 flex items-center gap-4 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting 
                  ? (lang === 'ar' ? 'جاري الإرسال...' : 'Envoi en cours...') 
                  : (lang === 'ar' ? 'إرسال الاستفسار' : 'Envoyer la demande')
                }
                {!isSubmitting && (
                  <Send size={18} className={`transition-transform flex-shrink-0 ${dir === 'rtl' ? 'scale-x-[-1] group-hover:-translate-x-1' : 'group-hover:translate-x-1'} group-hover:-translate-y-1`} />
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
