// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCdKTLeA6M81basu776mOcvrAfb6Knr6tY',
  authDomain: 'car-doct0r-client.firebaseapp.com',
  projectId: 'car-doct0r-client',
  storageBucket: 'car-doct0r-client.appspot.com',
  messagingSenderId: '729521009238',
  appId: '1:729521009238:web:b35855cbbcb9d3bc93c1f7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
