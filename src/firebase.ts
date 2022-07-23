// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

import { getUserByUID } from './services/vendereApi/VendereApiUser';
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
  appId: "1:483241483648:web:496f2601d1f542a4ee3565",
};

// Backup Firebase project
// const firebaseConfig = {
//     apiKey: "AIzaSyBQBxjN7cRUwBu23Xd94XQWlbJoTCv-zJI",
//     authDomain: "vendere-d6f89.firebaseapp.com",
//     projectId: "vendere-d6f89",
//     storageBucket: "vendere-d6f89.appspot.com",
//     messagingSenderId: "1060212968640",
//     appId: "1:1060212968640:web:48090c96802bd9001ff125"
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const refreshAccessTokenApiUrl = `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`;

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    UserModule.setFirebaseUser(user);
    if (!UserModule.isUserBeingCreated) {
      getUserByUID(user.uid).then((userInfo) => {
        if (userInfo) {
          UserModule.setLoginUser(userInfo);
        }
      });
    }
  }
});

export const firebaseStorage = getStorage(app);
