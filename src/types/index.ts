// Prototipo base del proyecto
export interface MetricaProyecto {
  id: number;
  titulo: string;
  valor: string | number;
  estado: string;
}

// Interfaz para el Analista IA (compatible con la guía y el proyecto)
export interface Indicator {
  id?: number | string;
  titulo?: string;
  valor?: string | number;
  estado?: string;
  metric?: string;
  value?: string | number;
  status?: string;
}

// Interfaces del catálogo CampiLeche
export interface Product {
  id: number | string;
  title: string;
  price: number;
  description: string;
  category?: string;
  image: string;
  apiId?: number;
  apiRating?: number;
  apiCategory?: string;
}

export interface ApiProduct {
  id: number;
  category?: string;
  rating?: {
    rate?: number;
  };
}

export interface UserProfile {
  name: string;
  email: string;
}

export type CategoryFilter = 'all' | 'leche' | 'derivados';
