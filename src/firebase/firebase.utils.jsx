import { initializeApp } from 'firebase/app';
import {
   getAuth,
   GoogleAuthProvider,
   signInWithPopup
} from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';


const config = {
   apiKey: "AIzaSyB6kl23YmYmVr79_9Cj7aWr5EgAbVBCRUo",
   authDomain: "crwn-clothing-db-33bde.firebaseapp.com",
   projectId: "crwn-clothing-db-33bde",
   storageBucket: "crwn-clothing-db-33bde.appspot.com",
   messagingSenderId: "983397688852",
   appId: "1:983397688852:web:b8d484ffe03effe7cda901",
   measurementId: "G-D9T2CMSBX7"
}

const app = initializeApp(config);
export const auth = getAuth(app, {sessionStorage: true});
export const firestore = getFirestore(app);


export const createUserProfileDocument = async (user, additionalData) => {
   const db = getFirestore();
   const userDocRef = doc(db, 'users', user.uid);

   if (user) {
      const {displayName, email} = user;
      const createdAt = new Date();
      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalData,
         })

      } catch (error) {
         console.log(error);
      }
   } else {
      return
   }

   return userDocRef;
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => signInWithPopup(auth, provider);



export default app;