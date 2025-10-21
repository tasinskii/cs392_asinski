// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, onValue, push, ref, update } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADpmAe5_M8whaBAGVCHeTxpLmSjs2vdu8",
  authDomain: "cs392-asinski-e1ed0.firebaseapp.com",
  databaseURL: "https://cs392-asinski-e1ed0-default-rtdb.firebaseio.com",
  projectId: "cs392-asinski-e1ed0",
  storageBucket: "cs392-asinski-e1ed0.firebasestorage.app",
  messagingSenderId: "415777433199",
  appId: "1:415777433199:web:819bd2146f938701c9cf9a"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

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
