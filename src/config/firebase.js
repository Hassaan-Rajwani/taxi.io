import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD8RuLTlS_n8xrPZxlXChrACfFoI1Ldfg4",
    authDomain: "taxi-app-4e6e8.firebaseapp.com",
    projectId: "taxi-app-4e6e8",
    storageBucket: "taxi-app-4e6e8.appspot.com",
    messagingSenderId: "218087993821",
    appId: "1:218087993821:web:4f6faabf68f46109a34634"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()
const storage = getStorage();

async function userInfo(name, id, pickUp, dropOff, status, rideType) {
    try {
        await addDoc(collection(db, "adUser"), {
            name: name,
            id: id,
            pickUp: pickUp,
            dropOff: dropOff,
            status: status,
            rideType: rideType
        })
        alert('Searching For A Driver...')
    } catch (e) {
        alert(e.message)
    }
}

export {
    userInfo
}