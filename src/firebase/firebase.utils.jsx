import { initializeApp } from 'firebase/app';
import {
   getAuth,
   GoogleAuthProvider,
   signInWithPopup
} from 'firebase/auth';
import { getFirestore, setDoc, doc, collection, writeBatch } from 'firebase/firestore';

// firebase configuration
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

// create a new user information to cloud firestore with the props inputted from the sign in/ sign up forms
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


// uploading the shop data to firebase cloud firestore
export const uploadShopData = async (collectionKey, dataToAdd) => {
   // instance of the collection reference in cloud firestore
   const collectionRef = collection(firestore, collectionKey);

   // using writebatch to upload multiple documents as a single operation request
   const batch = writeBatch(firestore);

   dataToAdd.forEach(data => {
      const newDocRef = doc(collectionRef);
      batch.set(newDocRef, data);
   })

   // commit the batch documents as a single unit
   return await batch.commit();
}

// retrieving the shop data from firestore. 
// This function will return an object where the keys are the collection titles in lowercase and the values are the collection data.
export const convertCollectionsSnapshotToMap = collections => {
   const collectionsMap = {};
         
   collections.forEach(doc => {
      const { title, items } = doc.data();

      // create new prop of the object with the prop name being the collection title.toLowerCase()
      // and its value being the collection data
      collectionsMap[title.toLowerCase()] = {
         routeName: encodeURI(title.toLowerCase()),
         id: doc.id,
         title,
         items
      }
   })
   return collectionsMap
}


export default app;