const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'nav.cta': "Let's Talk",
    'hero.description': 'Senior Software Engineer specializing in scalable backend systems, cloud infrastructure, and DevOps.',
    'hero.badge': 'Available for opportunities',
    'hero.greeting': "Hi, I'm",
    'hero.typewriterPrefix': 'I build',
    'hero.cta.work': 'View My Work',
    'hero.cta.contact': 'Get In Touch',
    'hero.stat.label': 'Years Experience',
    'hero.skillsTitle': 'Skills & Experience',
    'hero.scroll': 'Scroll to explore',
    'unit.yrs': 'yrs',
    'about.tag': 'About Me',
    'about.title': 'From Backend to Cloud',
    'about.badge': 'Years of<br>Experience',
    'about.subtitle': 'Building the backbone of modern applications',
    'about.p1': "I'm a passionate Senior Software Engineer with a strong focus on backend development and DevOps practices. With 6+ years of experience, I've architected and built scalable systems that handle millions of requests.",
    'about.p2': 'My expertise spans from designing robust APIs and microservices to implementing CI/CD pipelines and managing cloud infrastructure. I believe in writing clean, maintainable code and building systems that stand the test of time.',
    'about.h.backend.title': 'Backend Expert',
    'about.h.backend.sub': 'Scalable APIs & Microservices',
    'about.h.devops.title': 'DevOps Practitioner',
    'about.h.devops.sub': 'CI/CD, Containers & Cloud',
    'about.h.frontend.title': 'Frontend Developer',
    'about.h.frontend.sub': 'Modern Web Interfaces',
    'about.contactBtn': 'Contact Me',
    'skills.tag': 'Skills & Expertise',
    'skills.title': 'Technologies I Master',
    'skills.backend': 'Backend Development',
    'skills.devops': 'DevOps & Cloud',
    'skills.frontend': 'Frontend Development',
    'level.expert': 'Expert',
    'level.proficient': 'Proficient',
    'level.familiar': 'Familiar',
    'exp.tag': 'Career Journey',
    'exp.title': 'Professional Experience',
    'exp.educationLabel': 'Education',
    'contact.tag': 'Get In Touch',
    'contact.title': "Let's Work Together",
    'contact.description': "Have a project in mind or want to discuss opportunities? I'm always open to new challenges and collaborations.",
    'contact.emailLabel': 'Email',
    'contact.locationLabel': 'Location',
    'contact.location': 'France · Available Worldwide (Remote)',
    'footer.tagline': 'Backend, DevOps & Cloud Engineering',
    'footer.rights': 'All rights reserved.',
    'footer.crafted': 'Crafted with',
    'footer.and': 'and lots of',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.experience': 'Expérience',
    'nav.contact': 'Contact',
    'nav.cta': 'Discutons',
    'hero.description': "Ingénieur logiciel senior spécialisé en systèmes backend scalables, infrastructures cloud et DevOps.",
    'hero.badge': 'Disponible pour de nouvelles opportunités',
    'hero.greeting': 'Bonjour, je suis',
    'hero.typewriterPrefix': 'Je construis',
    'hero.cta.work': 'Voir mon parcours',
    'hero.cta.contact': 'Me contacter',
    'hero.stat.label': "Ans d'expérience",
    'hero.skillsTitle': 'Compétences & Expérience',
    'hero.scroll': 'Défiler pour explorer',
    'unit.yrs': 'ans',
    'about.tag': 'À propos',
    'about.title': 'Du Backend au Cloud',
    'about.badge': "Ans d'expérience",
    'about.subtitle': 'Construire le socle des applications modernes',
    'about.p1': "Ingénieur logiciel senior passionné, avec une forte expertise en développement backend et en pratiques DevOps. Fort de 6 ans d'expérience, j'ai conçu et construit des systèmes scalables traitant des millions de requêtes.",
    'about.p2': "Mon expertise couvre la conception d'APIs robustes et de microservices, la mise en place de pipelines CI/CD et la gestion d'infrastructures cloud. Je crois en un code propre, maintenable, et en des systèmes pensés pour durer.",
    'about.h.backend.title': 'Expert Backend',
    'about.h.backend.sub': 'APIs & Microservices scalables',
    'about.h.devops.title': 'Praticien DevOps',
    'about.h.devops.sub': 'CI/CD, Conteneurs & Cloud',
    'about.h.frontend.title': 'Développeur Frontend',
    'about.h.frontend.sub': 'Interfaces Web modernes',
    'about.contactBtn': 'Me contacter',
    'skills.tag': 'Compétences & Expertise',
    'skills.title': 'Technologies maîtrisées',
    'skills.backend': 'Développement Backend',
    'skills.devops': 'DevOps & Cloud',
    'skills.frontend': 'Développement Frontend',
    'level.expert': 'Expert',
    'level.proficient': 'Confirmé',
    'level.familiar': 'Notions',
    'exp.tag': 'Parcours',
    'exp.title': 'Expérience professionnelle',
    'exp.educationLabel': 'Formation',
    'contact.tag': 'Me contacter',
    'contact.title': 'Travaillons ensemble',
    'contact.description': "Un projet en tête ou envie de discuter d'opportunités ? Je suis toujours ouvert à de nouveaux défis et collaborations.",
    'contact.emailLabel': 'E-mail',
    'contact.locationLabel': 'Localisation',
    'contact.location': 'France · Disponible partout (Télétravail)',
    'footer.tagline': 'Ingénierie Backend, DevOps & Cloud',
    'footer.rights': 'Tous droits réservés.',
    'footer.crafted': 'Créé avec',
    'footer.and': 'et beaucoup de',
  }
};

class LangSwitcher {
  constructor() {
    this.current = localStorage.getItem('lang') || 'en';
    this.typewriterStrings = {
      en: ['scalable backend systems', 'cloud infrastructure', 'DevOps pipelines', 'APIs & microservices', 'solutions that matter'],
      fr: ['des systèmes backend scalables', 'des infrastructures cloud', 'des pipelines DevOps', 'des APIs & microservices', 'des solutions qui comptent'],
    };
    this.apply(this.current, false);
    this.bindButtons();
  }

  apply(lang, animate = true) {
    this.current = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key] !== undefined) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update lang buttons active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update typewriter if it exists
    if (window._typewriterInstance) {
      window._typewriterInstance.updateStrings(this.typewriterStrings[lang]);
    }
  }

  bindButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => this.apply(btn.dataset.lang));
    });
  }
}
