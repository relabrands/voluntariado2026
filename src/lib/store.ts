import { useSyncExternalStore } from 'react';
import { db, auth } from './firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

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
  createdAt?: any;
};

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  imageUrl: string;
  createdAt?: any;
};

export type CalendarEvent = {
  id: string;
  month: string;
  day: string;
  title: string;
  desc: string;
  color: string;
  createdAt?: any;
};

export type Resource = {
  id: string;
  title: string;
  desc: string;
  link: string;
  color: string;
  createdAt?: any;
};

// --- Store Implementation ---
type StoreState = {
  user: User | null;
  authInitialized: boolean;
  activities: Activity[];
  posts: BlogPost[];
  events: CalendarEvent[];
  resources: Resource[];
};

class Store {
  private state: StoreState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = {
      user: null,
      authInitialized: false,
      activities: [],
      posts: [],
      events: [],
      resources: [],
    };

    // Listen to Auth State
    onAuthStateChanged(auth, (user) => {
      this.state = { ...this.state, user, authInitialized: true };
      this.notify();
    });

    // Listen to Firestore Collections
    const activitiesQ = query(collection(db, 'activities'), orderBy('createdAt', 'desc'));
    onSnapshot(activitiesQ, (snap) => {
      this.state = {
        ...this.state,
        activities: snap.docs.map(d => ({ id: d.id, ...d.data() } as Activity))
      };
      this.notify();
    }, () => {}); // ignore permission errors if rules are strict

    const postsQ = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    onSnapshot(postsQ, (snap) => {
      this.state = {
        ...this.state,
        posts: snap.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost))
      };
      this.notify();
    }, () => {});

    const eventsQ = query(collection(db, 'events'), orderBy('createdAt', 'asc'));
    onSnapshot(eventsQ, (snap) => {
      this.state = {
        ...this.state,
        events: snap.docs.map(d => ({ id: d.id, ...d.data() } as CalendarEvent))
      };
      this.notify();
    }, () => {});

    const resourcesQ = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
    onSnapshot(resourcesQ, (snap) => {
      this.state = {
        ...this.state,
        resources: snap.docs.map(d => ({ id: d.id, ...d.data() } as Resource))
      };
      this.notify();
    }, () => {});
  }

  getState = () => this.state;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // --- Auth ---
  login = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass);
  logout = () => signOut(auth);

  // --- Activities ---
  addActivity = async (activity: Omit<Activity, 'id' | 'categoryColor'>) => {
    let color = "var(--brand)";
    if (activity.category.toLowerCase().includes("ambiente")) color = "var(--magenta)";
    if (activity.category.toLowerCase().includes("social")) color = "var(--navy)";
    
    let formattedDate = activity.date;
    try {
      if (activity.date.includes('T')) {
        const d = new Date(activity.date);
        const dateStr = d.toLocaleDateString('es-DO', { weekday: 'short', day: 'numeric', month: 'short' });
        const timeStr = d.toLocaleTimeString('es-DO', { hour: 'numeric', minute: '2-digit', hour12: true });
        const cleanDateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1).replace('.', '');
        formattedDate = `${cleanDateStr} · ${timeStr}`;
      }
    } catch (e) {}

    await addDoc(collection(db, 'activities'), {
      ...activity,
      categoryColor: color,
      date: formattedDate,
      rawDate: activity.date,
      createdAt: serverTimestamp()
    });
  };

  deleteActivity = (id: string) => deleteDoc(doc(db, 'activities', id));

  // --- Posts ---
  addPost = async (post: Omit<BlogPost, 'id' | 'date'>) => {
    await addDoc(collection(db, 'posts'), {
      ...post,
      date: new Date().toLocaleDateString('es-DO', { day: 'numeric', month: 'short', year: 'numeric' }),
      createdAt: serverTimestamp()
    });
  };

  deletePost = (id: string) => deleteDoc(doc(db, 'posts', id));

  // --- Events ---
  addEvent = async (event: Omit<CalendarEvent, 'id'>) => {
    await addDoc(collection(db, 'events'), { ...event, createdAt: serverTimestamp() });
  };
  deleteEvent = (id: string) => deleteDoc(doc(db, 'events', id));

  // --- Resources ---
  addResource = async (resource: Omit<Resource, 'id'>) => {
    await addDoc(collection(db, 'resources'), { ...resource, createdAt: serverTimestamp() });
  };
  deleteResource = (id: string) => deleteDoc(doc(db, 'resources', id));
}

export const store = new Store();

// --- Hooks ---
export function useActivities() {
  const activities = useSyncExternalStore(store.subscribe, () => store.getState().activities);
  return activities.filter(a => {
    if (!a.rawDate) return true;
    const activityTime = new Date(a.rawDate).getTime();
    return activityTime >= Date.now();
  });
}

export function usePosts() {
  return useSyncExternalStore(store.subscribe, () => store.getState().posts);
}

export function useEvents() {
  return useSyncExternalStore(store.subscribe, () => store.getState().events);
}

export function useResources() {
  return useSyncExternalStore(store.subscribe, () => store.getState().resources);
}

export function useAuth() {
  const state = useSyncExternalStore(store.subscribe, store.getState);
  return { user: state.user, initialized: state.authInitialized };
}
