// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { Timestamp, collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";

import toast from 'react-hot-toast';
import gen from "./gen";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIB9Px3bueCgMRIwv09VjcIsVdcUI2pNg",
  authDomain: "bibo-d7124.firebaseapp.com",
  projectId: "bibo-d7124",
  storageBucket: "bibo-d7124.appspot.com",
  messagingSenderId: "746341492497",
  appId: "1:746341492497:web:6102f6fbbeeadbaa4f4eb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


async function add_doc(collection, document, own_id=null, showToast=true){

  const id = own_id ? own_id : gen(16);

  if (!showToast) return setDoc(doc(db, collection, id), {
    ...document,
    createdAt: Timestamp.now()
  }, { merge: true });

  return toast.promise(
      setDoc(doc(db, collection, id), {
        ...document,
        createdAt: Timestamp.now()
      }, { merge: true }),
    {
      success: "Task Succesful",
      error: "Task Failed",
      loading: "Updating..."
    }
  )
}

async function uploadFile(name, type, string){
  const storageRef = ref(storage, `${type}/${Date.now()}-${name}`);

  let snapshot = await toast.promise(
      uploadString(storageRef, string, 'data_url'),
      {
        loading: "Uploading " +type,
        success: type+" successfully uploaded",
        error: "Uploading " +type+ " failed",
      }
  );

  let downloadURL = await toast.promise(
      getDownloadURL(snapshot.ref),
      {
        loading: "Downloading " +type+ " URL",
        success: type+" URL Downloaded",
        error: "Downloading " +type+ " URL failed",
      }
  );  

  return downloadURL;
}

async function read_database(dbname){
  const data = [];
  const querySnapshot = await getDocs(collection(db, dbname));
  querySnapshot.forEach((doc) => data.push(doc.data()));

  return JSON.parse(JSON.stringify(data));
}

async function get_single_doc(dbname, id){
  const singleDoc = await getDoc(doc(db, dbname, id));
  return JSON.parse(JSON.stringify(singleDoc.data() || null));
}


export {
  app,
  storage,
  add_doc,
  uploadFile,
  read_database,
  get_single_doc
};
