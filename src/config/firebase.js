import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, getDocs, setDoc} from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD8RuLTlS_n8xrPZxlXChrACfFoI1Ldfg4",
    authDomain: "taxi-app-4e6e8.firebaseapp.com",
    projectId: "taxi-app-4e6e8",
    storageBucket: "taxi-app-4e6e8.appspot.com",
    messagingSenderId: "218087993821",
    appId: "1:218087993821:web:4f6faabf68f46109a34634"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()

async function users(userName, userId) {
    try {
        await addDoc(collection(db, "users"), {
            name: userName,
            id: userId
        })
        alert('User Added')
    } catch (e) {
        alert(e.message)
    }
}

async function drivers(userName, userId) {
    try {
        await addDoc(collection(db, "drivers"), {
            name: userName,
            id: userId
        })
        alert('Driver Added')
    } catch (e) {
        alert(e.message)
    }
}

async function userInfo(userName, userId, userPickUp, userDropOff, userStatus, userRideType, userArea, ridePrice) {
    try {
        await addDoc(collection(db, "userRideRequest"), {
            name: userName,
            id: userId,
            pickUp: userPickUp,
            dropOff: userDropOff,
            status: userStatus,
            rideType: userRideType,
            area: userArea,
            price: ridePrice
        })
        alert('Searching For A Driver...')
    } catch (e) {
        alert(e.message)
    }
}

async function driverAccept(userName, userId, userLocation) {
    try {
        await addDoc(collection(db, "DriverAccepted"), {
            name: userName,
            id: userId,
            location: userLocation
        })
        alert('Accepted ...')
    } catch (e) {
        alert(e.message)
    }
}

async function getUserInfo() {
    const querySnapshot = await getDocs(collection(db, "userRideRequest"))
    const ads = []
    querySnapshot.forEach((doc) => {
        ads.push({ ...doc.data(), id: doc.id })
    })
    return ads
}

async function getDriverInfo() {
    const querySnapshot = await getDocs(collection(db, "DriverAccepted"))
    const ads = []
    querySnapshot.forEach((doc) => {
        ads.push({ ...doc.data(), id: doc.id })
    })
    return ads
}


export {
    userInfo,
    getUserInfo,
    users,
    drivers,
    driverAccept,
    getDriverInfo
}