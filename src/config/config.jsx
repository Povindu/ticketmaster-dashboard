
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { getStorage } from "firebase/storage";



//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChPiwMFqM7rQvPPB7-STe_wgaD8E2r3FI",
  authDomain: "naada-ticketmaster.firebaseapp.com",
  databaseURL: "https://naada-ticketmaster-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "naada-ticketmaster",
  storageBucket: "naada-ticketmaster.appspot.com",
  messagingSenderId: "275616775829",
  appId: "1:275616775829:web:4393b6910012e0ef17259c"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getDatabase(app);


