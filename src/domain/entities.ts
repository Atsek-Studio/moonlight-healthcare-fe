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

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
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
