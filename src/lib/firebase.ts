import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDB0Ltvuhr04f60Nz9XD69S6hXU7b0qq6c",
  authDomain: "voluntariado-aong.firebaseapp.com",
  projectId: "voluntariado-aong",
  storageBucket: "voluntariado-aong.firebasestorage.app",
  messagingSenderId: "4775536394",
  appId: "1:4775536394:web:37eaf25a1a2f039dd73cf3",
  measurementId: "G-NBB33JFQ4E"
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
