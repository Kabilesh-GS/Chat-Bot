import {initializeApp} from 'firebase/app'
import { getStorage } from 'firebase/storage';
import { getFirestore,doc,getDoc,setDoc, serverTimestamp, addDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth,signInWithPopup,GoogleAuthProvider,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
const FirebaseApi = import.meta.env.VITE_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: FirebaseApi,
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
export const storage = getStorage(app);

export const createUserWithEmail = async (email, password) => {
 return await createUserWithEmailAndPassword(auth,email,password)
}
export const signinWithEmailPass = async (email,password) => {
  return await signInWithEmailAndPassword(auth,email,password);
}

export const db = getFirestore(app);
export const createCollectionUsers = async (userAuth,additionalInfo = {}) => {
  const UserDocument = doc(db, 'users', userAuth.uid);
  const UserDocPresent = await getDoc(UserDocument);
  if(!UserDocPresent.exists()){
    const createdDate = new Date();
    const { displayName,email } = userAuth;
    try{
      await setDoc(UserDocument, {
        displayName,
        email,
        createdDate,
        ...additionalInfo
      })
    }
    catch(error){
      console.log('An error occured',error)
    }
  }
}
export const getUserDetails = async (uid) => {
  try{
    const userDocRef = doc(db, 'users',uid);
    const userSnap = await getDoc(userDocRef);

    if(userSnap.exists()){
      return userSnap.data();
    }
  }
  catch(error){
    alert("No data found");
  }
}

export const sendMessage = async (userId,text,sender) => {
  const messageRef = collection(db,'users',userId,'chats');

  await addDoc(messageRef, {
    text,
    sender,
    timestamp : serverTimestamp(),
  })
}

export const listenMessage = (userId,callback) => {
  const q = query(
    collection(db,'users',userId,'chats'),
    orderBy("timestamp", "asc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(messages);
  })
  return unsubscribe;
}