export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: string;
  oldPrice?: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  benefits?: string[];
  usage?: string;
  ingredients?: string[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featured?: boolean;
}

export interface ServiceBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceSpecialist {
  name: string;
  role: string;
  quote: string;
  image: string;
  experience: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  subtitle?: string;
  heroImage?: string;
  longDescription?: string;
  benefits?: ServiceBenefit[];
  processSteps?: ServiceProcessStep[];
  specialist?: ServiceSpecialist;
  faqs?: ServiceFAQ[];
}

export interface Practitioner {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
