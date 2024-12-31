import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD93ZTnKai7sfOMSlT10Nh9qvsRterybSU",
  authDomain: "healthsync-769a3.firebaseapp.com",
  projectId: "healthsync-769a3",
  storageBucket: "healthsync-769a3.appspot.com", // Fixed storage bucket domain
  messagingSenderId: "619068906425",
  appId: "1:619068906425:web:1a9b68ff3109708fc73468",
};

// Initialize Firebase App

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;