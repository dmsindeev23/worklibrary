export interface Material {
  id: string;
  name: string;
  type: 'checklist' | 'template' | 'pdf';
  url: string;
}

export interface Module {
  id: string;
  title: string;
  outcome: string;
  description: string;
  coverColor: string;
  coverImage: string;
  duration: number;
  topic: string;
  format: 'video' | 'audio' | 'interactive';
  level: 'beginner' | 'intermediate' | 'advanced';
  bestFor: string[];
  price: number;
  collectionId: string;
  materials: Material[];
  videoUrl?: string;
  summary?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  moduleIds: string[];
}

export interface CartItem {
  moduleId: string;
  quantity: number;
}

export interface Subscription {
  id: string;
  plan: 'monthly' | 'yearly' | 'team';
  startDate: string;
  endDate: string;
  status: 'active' | 'cancelled' | 'expired';
}

export interface User {
  id: string;
  email: string;
  name: string;
  purchasedModules: string[];
  moduleProgress: Record<string, number>;
  subscription?: Subscription;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  bulletPoints: string[];
}

export type FilterOption = {
  id: string;
  label: string;
};

export type ViewMode = 'covers' | 'list';
