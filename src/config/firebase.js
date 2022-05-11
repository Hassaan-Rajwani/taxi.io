import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD8RuLTlS_n8xrPZxlXChrACfFoI1Ldfg4",
    authDomain: "taxi-app-4e6e8.firebaseapp.com",
    projectId: "taxi-app-4e6e8",
    storageBucket: "taxi-app-4e6e8.appspot.com",
    messagingSenderId: "218087993821",
    appId: "1:218087993821:web:4f6faabf68f46109a34634"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function register() {
    try {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result);
            })
        alert('Successfully Registered and added in database')
    } catch (e) {
        alert(e.message)
    }
}

export {
    register
}

// let permissions = ['public_profile', 'email']

// const loginUserWithFbDriver = async () => {
//     // Facebook.logOutAsync()
//     try {
//         await Facebook.initializeAsync({
//             appId: "665321297855587"
//         });

//         let result = await Facebook.logInWithReadPermissionsAsync({ permissions })
//         const res = await axios.get('https://graph.facebook.com/v2.5/me?fields=picture.width(720).height(720),email,name,friends&access_token=' + result.token)
//             .then(res => {
//                 console.log("FAcebook success", res.data);
//             })
//             .catch(err => {
//                 console.log(err, "ERR");
//             })


//         let response = firebase.auth.FacebookAuthProvider.credential(result.token)

//         try {

//             const result = firebase.auth().signInWithCredential(response)
//             console.log(result, "resultFirebase");
//             result.then((res) => {
//                 console.log(res, "resResult");
//                 let id = res.user.uid
//                 firebase.database().ref(`driver/${id}`)
//                     .set({
//                         name: res.additionalUserInfo.profile.name,
//                         email: res.additionalUserInfo.profile.email,
//                         image: res.additionalUserInfo.profile.picture.data.url,
//                         uuid: id,
//                         type: "driver"
//                     }).then((res) => {
//                         alert("successfully loged in")
//                     }).catch((err) => {
//                         // console.log(err, "ERRRRRRRRRRR");
//                     })
//             })
//             return result


//         } catch (error) {
//             console.log(error, "ERRRRRRRRRRRRRRR");
//         }
//     }
//     catch (err) {
//         console.log(err, "errrr");
//     }
// }