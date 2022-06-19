// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import UserModule from './store/modules/User';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC5FRiW7CiNiSu_Qpufsnsx-3yYO_hr8Ls",
    authDomain: "vendere-23f76.firebaseapp.com",
    projectId: "vendere-23f76",
    storageBucket: "vendere-23f76.appspot.com",
    messagingSenderId: "483241483648",
    appId: "1:483241483648:web:496f2601d1f542a4ee3565"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const refreshAccessTokenApiUrl = `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`;

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        UserModule.setCurrentUser(user);
    }
});
