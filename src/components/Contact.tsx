"use client";
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { sendEmailAction, type ContactFormData } from '@/app/[locale]/actions/contact';

const Contact = () => {
  const t = useTranslations();
  const locale = useLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchema = z.object({
    name: z.string().min(2, t('contact.validation.name_min')),
    email: z.string().email(t('contact.validation.email_invalid')),
    subject: z.string().min(5, t('contact.validation.subject_min')),
    message: z.string().min(10, t('contact.validation.message_min')),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading(t('common.loading'));
    
    try {
      const result = await sendEmailAction(data);
      if (result.success) {
        toast.success(t('common.success'), { id: loadingToast });
        reset();
      } else {
        toast.error(t('common.error'), { id: loadingToast });
      }
    } catch {
      toast.error(t('common.unexpected_error'), { id: loadingToast });
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
              {t('contact.title')}
            </p>
            <h2 className="text-5xl md:text-6xl text-primary leading-tight lowercase mb-8">
              {t('nav.contact')}
            </h2>
            <div className="w-16 h-1 bg-gold/50 mb-10" />
            <p className="text-xl text-gray-500 font-light italic mb-16 max-w-lg leading-relaxed">
              {t('contact.description')}
            </p>
            
            <div className="flex flex-col gap-10">
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 bg-primary flex items-center justify-center text-gold shrink-0 transition-transform duration-500 group-hover:scale-110">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-serif italic text-2xl mb-2 text-primary">{t('contact.location_label')}</h4>
                  <p className="text-gray-500 font-light text-lg">{t('contact.location_value')}</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 bg-primary flex items-center justify-center text-gold shrink-0 transition-transform duration-500 group-hover:scale-110">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-serif italic text-2xl mb-2 text-primary">{t('contact.phone_label')}</h4>
                  <p className={`text-gray-500 font-light text-lg ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir="ltr">0793704284</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 bg-primary flex items-center justify-center text-gold shrink-0 transition-transform duration-500 group-hover:scale-110">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-serif italic text-2xl mb-2 text-primary">{t('contact.email_label')}</h4>
                  <p className="text-gray-500 font-light text-lg">Mahifaresavocat@gmail.com</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 bg-primary flex items-center justify-center text-gold shrink-0 transition-transform duration-500 group-hover:scale-110">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-serif italic text-2xl mb-2 text-primary">{t('contact.hours_label')}</h4>
                  <p className="text-gray-500 font-light text-lg">{t('contact.hours_value')}</p>
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
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('contact.name_label')}</label>
                  <input 
                    id="name"
                    type="text" 
                    {...register("name")}
                    className={`py-3 bg-transparent border-b-2 outline-none transition-colors text-lg ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-gold'}`} 
                  />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('contact.email_label')}</label>
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
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('contact.subject_label')}</label>
                <input 
                  id="subject"
                  type="text" 
                  {...register("subject")}
                  className={`py-3 bg-transparent border-b-2 outline-none transition-colors text-lg ${errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-gold'}`} 
                />
                {errors.subject && <span className="text-red-500 text-xs">{errors.subject.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('contact.message_label')}</label>
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
                  ? t('common.loading')
                  : t('common.send')
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
