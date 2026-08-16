export interface Service {
  title: string;
  description: string;
  tags: string[];
  icon: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Content {
  nav: {
    services: string;
    process: string;
    about: string;
    contact: string;
    langToggle: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: Service[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    description: string;
    items: Testimonial[];
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    facts: { label: string; value: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  };
  footer: {
    copyright: string;
    location: string;
  };
}
