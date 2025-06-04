import {initializeApp} from 'firebase/app'
import { getFirestore,doc,getDoc,setDoc,collection,serverTimestamp } from 'firebase/firestore';
import { getAuth,signInWithPopup,GoogleAuthProvider,signOut } from 'firebase/auth' 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
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

export const db = getFirestore(app);
export const createCollectionUsers = async (userAuth) => {
  const UserDocument = doc(db, 'users', userAuth.uid);
  const UserDocPresent = await getDoc(UserDocument);
  if(!UserDocPresent.exists()){
    const createdDate = new Date();
    const { displayName,email } = userAuth;
    try{
      await setDoc(UserDocument, {
        displayName,
        email,
        createdDate
      })
    }
    catch(error){
      console.log('An error occured',error)
    }
  }
}
