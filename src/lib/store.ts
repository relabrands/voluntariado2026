import { useSyncExternalStore } from 'react';

// --- Types ---
export type Activity = {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  date: string;
  location: string;
  ong: string;
  spots: number;
  link: string;
  rawDate?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  imageUrl: string;
};

// --- Initial Data ---
const initialActivities: Activity[] = [
  {
    id: "01",
    category: "Medio Ambiente",
    categoryColor: "var(--magenta)",
    title: "Reforestación en el Parque Nacional Los Haitises",
    description: "Jornada de siembra de 500 árboles nativos junto a guardaparques y biólogos locales.",
    date: "Sáb 14 Mar · 7:00 AM",
    location: "Sabana de la Mar",
    ong: "Fundación Verde Vivo",
    spots: 24,
    link: "#",
  },
  {
    id: "02",
    category: "Educación",
    categoryColor: "var(--brand)",
    title: "Tutorías de lectura para niñas y niños",
    description: "Acompaña a estudiantes de 3ro a 6to grado en sesiones semanales de lectura guiada.",
    date: "Dom 22 Mar · 9:00 AM",
    location: "Villa Duarte, SDE",
    ong: "Enseña por RD",
    spots: 12,
    link: "#",
  },
  {
    id: "03",
    category: "Ayuda Social",
    categoryColor: "var(--navy)",
    title: "Distribución de alimentos a familias vulnerables",
    description: "Empaque y reparto de 300 raciones en comunidades priorizadas por Gabinete de Familia.",
    date: "Sáb 28 Mar · 4:00 PM",
    location: "Los Mameyes, SDE",
    ong: "Red Solidaria Caribe",
    spots: 40,
    link: "#",
  },
];

const initialPosts: BlogPost[] = [
  {
    id: "1",
    title: "Lanzamiento oficial del IVY 2026",
    summary: "Se anuncian las primeras metas de la campaña y los compromisos del gobierno para este año del voluntariado.",
    content: "Texto completo de la noticia...",
    date: "10 Feb 2026",
    imageUrl: "https://images.unsplash.com/photo-1593113565694-c701438068d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

// --- Store Implementation ---
type StoreState = {
  activities: Activity[];
  posts: BlogPost[];
};

class Store {
  private state: StoreState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    const savedActivities = localStorage.getItem('ivy_activities');
    const savedPosts = localStorage.getItem('ivy_posts');

    this.state = {
      activities: savedActivities ? JSON.parse(savedActivities) : initialActivities,
      posts: savedPosts ? JSON.parse(savedPosts) : initialPosts,
    };
  }

  getState = () => this.state;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private notify() {
    this.listeners.forEach((l) => l());
  }

  addActivity = (activity: Omit<Activity, 'id' | 'categoryColor'>) => {
    // Generate a simple ID
    const newId = String(this.state.activities.length + 1).padStart(2, '0');
    
    // Assign a color based on category
    let color = "var(--brand)";
    if (activity.category.toLowerCase().includes("ambiente")) color = "var(--magenta)";
    if (activity.category.toLowerCase().includes("social")) color = "var(--navy)";
    
    let formattedDate = activity.date;
    try {
      if (activity.date.includes('T')) {
        const d = new Date(activity.date);
        const dateStr = d.toLocaleDateString('es-DO', { weekday: 'short', day: 'numeric', month: 'short' });
        const timeStr = d.toLocaleTimeString('es-DO', { hour: 'numeric', minute: '2-digit', hour12: true });
        // Capitalize first letter of weekday
        const cleanDateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1).replace('.', '');
        formattedDate = `${cleanDateStr} · ${timeStr}`;
      }
    } catch (e) {
      // ignore and use raw
    }

    const newActivity: Activity = { ...activity, id: newId, categoryColor: color, date: formattedDate, rawDate: activity.date };
    
    this.state = {
      ...this.state,
      activities: [newActivity, ...this.state.activities],
    };
    
    localStorage.setItem('ivy_activities', JSON.stringify(this.state.activities));
    this.notify();
  };

  addPost = (post: Omit<BlogPost, 'id' | 'date'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('es-DO', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    this.state = {
      ...this.state,
      posts: [newPost, ...this.state.posts],
    };
    localStorage.setItem('ivy_posts', JSON.stringify(this.state.posts));
    this.notify();
  };

  deletePost = (id: string) => {
    this.state = {
      ...this.state,
      posts: this.state.posts.filter(p => p.id !== id),
    };
    localStorage.setItem('ivy_posts', JSON.stringify(this.state.posts));
    this.notify();
  };
}

export const store = new Store();

// --- Hooks ---
export function useActivities() {
  const activities = useSyncExternalStore(store.subscribe, () => store.getState().activities);
  
  return activities.filter(a => {
    if (!a.rawDate) return true; // keep mock data without rawDate
    const activityTime = new Date(a.rawDate).getTime();
    return activityTime >= Date.now();
  });
}

export function usePosts() {
  const state = useSyncExternalStore(store.subscribe, store.getState);
  return state.posts;
}
