"use client";
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Lang = 'ar' | 'fr';
type Dir = 'rtl' | 'ltr';

interface LanguageTranslations {
  nav: {
    home: string;
    services: string;
    about: string;
    testimonials: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta_primary: string;
    cta_secondary: string;
  };
  about: {
    title: string;
    content: string;
  };
  services: {
    title: string;
    items: string[];
  };
  coverage: {
    title: string;
    content: string;
  };
  footer: {
    rights: string;
  };
}

interface LanguageContextType {
  lang: Lang;
  dir: Dir;
  toggleLanguage: () => void;
  t: LanguageTranslations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('ar');
  const [dir, setDir] = useState<Dir>('rtl');

  const translations: Record<Lang, LanguageTranslations> = {
    ar: {
      nav: {
        home: 'الرئيسية',
        services: 'الخدمات',
        about: 'من نحن',
        testimonials: 'آراء العملاء',
        contact: 'اتصل بنا',
      },
      hero: {
        title: 'الأستاذ ماحي فارس',
        subtitle: 'محامي معتمد لدى محكمة بوفاريك ومجلس قضاء البليدة. تمثيلكم امام المحاكم والمجالس القضائية وأيضا المحكمة العليا ومجلس الدولة',
        description: 'خبرة قانونية موثوقة لخدمتكم في جميع القضايا القانونية، مع التزام كامل بالدقة والاحترافية.',
        cta_primary: 'احجز استشارة الآن',
        cta_secondary: 'اتصل بنا',
      },
      about: {
        title: 'من نحن',
        content: 'الأستاذ ماحي فارس، محامٍ محترف يقدم خدمات قانونية شاملة في بوفاريك والمناطق المجاورة، مع خبرة في الدفاع والاستشارات القانونية.',
      },
      services: {
        title: 'الخدمات القانونية',
        items: [
          'الاستشارات القانونية',
          'القضايا المدنية',
          'القضايا الجنائية',
          'القانون التجاري',
          'تمثيل أمام المحاكم',
        ],
      },
      coverage: {
        title: 'نطاق الخدمة',
        content: 'نقدم خدماتنا في بوفاريك والمناطق القريبة منها',
      },
      footer: {
        rights: 'جميع الحقوق محفوظة © 2024 الأستاذ ماحي فارس',
      }
    },
    fr: {
      nav: {
        home: 'Accueil',
        services: 'Services',
        about: 'À propos',
        testimonials: 'Témoignages',
        contact: 'Contact',
      },
      hero: {
        title: 'Maître Mahi Fares',
        subtitle: 'Avocat agréé près le tribunal de Boufarik et la cour de Blida. Agréé à la Cour Suprême et Conseil d\'État',
        description: 'Expertise juridique fiable à votre service pour toutes vos affaires juridiques, avec un engagement total envers la rigueur et le professionnalisme.',
        cta_primary: 'Prendre rendez-vous',
        cta_secondary: 'Contactez-nous',
      },
      about: {
        title: 'À propos de nous',
        content: 'Maître Mahi Fares est un avocat professionnel offrant des services juridiques complets à Boufarik et ses environs, spécialisé dans la défense et le conseil juridique.',
      },
      services: {
        title: 'Services Juridiques',
        items: [
          'Conseil Juridique',
          'Affaires Civiles',
          'Affaires Pénales',
          'Droit Commercial',
          'Représentation devant les tribunaux',
        ],
      },
      coverage: {
        title: 'Zone de Service',
        content: 'Nous offrons nos services à Boufarik et dans les régions avoisinantes.',
      },
      footer: {
        rights: 'Tous droits réservés © 2024 Maître Mahi Fares',
      }
    }
  };

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'fr' : 'ar';
    setLang(newLang);
    setDir(newLang === 'ar' ? 'rtl' : 'ltr');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLanguage, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};
