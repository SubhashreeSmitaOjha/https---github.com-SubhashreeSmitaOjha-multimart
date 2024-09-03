import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAY_osm_99EOyC0FgvvqG2AfHUfvCWtsGM",
  authDomain: "eshoping-3b5c4.firebaseapp.com",
  projectId: "eshoping-3b5c4",
  storageBucket: "eshoping-3b5c4.appspot.com",
  messagingSenderId: "93527740421",
  appId: "1:93527740421:web:fc254e7e590ec85bf44c6c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const storage=getStorage(app);
export default app;