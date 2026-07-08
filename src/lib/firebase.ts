import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDB0Ltvuhr04f60Nz9XD69S6hXU7b0qq6c",
  authDomain: "voluntariado-aong.firebaseapp.com",
  projectId: "voluntariado-aong",
  storageBucket: "voluntariado-aong.firebasestorage.app",
  messagingSenderId: "4775536394",
  appId: "1:4775536394:web:37eaf25a1a2f039dd73cf3",
  measurementId: "G-NBB33JFQ4E"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
