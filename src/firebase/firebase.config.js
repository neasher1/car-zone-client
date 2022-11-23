// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDS4tvxgAf-5vVRHkphVxQNQdPcSH-AtpU",
    authDomain: "car-zone-f6b1a.firebaseapp.com",
    projectId: "car-zone-f6b1a",
    storageBucket: "car-zone-f6b1a.appspot.com",
    messagingSenderId: "917522073642",
    appId: "1:917522073642:web:02e26344a8133d7464db53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;