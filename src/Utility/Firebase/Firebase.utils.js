import {initializeApp} from 'firebase/app'
import { getAuth,signInWithPopup,GoogleAuthProvider,signOut } from 'firebase/auth' 

const firebaseConfig = {
  apiKey: "AIzaSyD0piRRe4KqE-1fsLl2PcnfqgSXK4Ie2GE",
  authDomain: "chat-bot-gemi.firebaseapp.com",
  projectId: "chat-bot-gemi",
  storageBucket: "chat-bot-gemi.firebasestorage.app",
  messagingSenderId: "689960502199",
  appId: "1:689960502199:web:3d776c34def105c18b5e32"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const Signin = () => signInWithPopup(auth,provider);
export const Signout = () => signOut(auth);