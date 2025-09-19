import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-XXXXXX",
  authDomain: "garage-sale-app.firebaseapp.com",
  projectId: "garage-sale-app",
  storageBucket: "garage-sale-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef12345"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore + Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
