// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom'
// Your web app's Firebase configuration
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type NextOrObserver, type User} from 'firebase/auth';

const dbURL = window.location.hostname === 'localhost' 
  ? 'http://localhost:9000?ns=cs392-asinski-e1ed0'
  : 'https://cs392-asinski-e1ed0-default-rtdb.firebaseio.com';


const firebaseConfig = {
  apiKey: "AIzaSyADpmAe5_M8whaBAGVCHeTxpLmSjs2vdu8",
  authDomain: "cs392-asinski-e1ed0.firebaseapp.com",
  databaseURL: dbURL,
  projectId: "cs392-asinski-e1ed0",
  storageBucket: "cs392-asinski-e1ed0.firebasestorage.app",
  messagingSenderId: "415777433199",
  appId: "1:415777433199:web:819bd2146f938701c9cf9a"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

export const signInWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(auth);

export { firebaseSignOut as signOut };


export interface AuthState {
  user: User | null,
  isAuthenticated: boolean,
  isInitialLoading: boolean
}

export const addAuthStateListener = (fn: NextOrObserver<any>) => (
  onAuthStateChanged(auth, fn)
);

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState(auth.currentUser)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const isAuthenticated = !!user;

  useEffect(() => addAuthStateListener((user: User) => {
      flushSync(() => {
        setUser(user);
        setIsInitialLoading(false);
      })
    }), [])

  return {user, isAuthenticated, isInitialLoading };
};



export const useDataQuery = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    return onValue(ref(database, path), (snapshot) => {
        setData( snapshot.val() );
        setLoading(false);
      }, (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, [ path ]);

  return [ data, loading, error ];
};

interface formData {
  term: string;
  course_num: string;
  title: string;
  meeting_time: string;
};

export const editField = (data: formData) => {
  let field = data.term + data.course_num;
  console.log(data);
  update(ref(database, `/courses/${field}`), {
    meets: data.meeting_time,
    title: data.title
  })
}
