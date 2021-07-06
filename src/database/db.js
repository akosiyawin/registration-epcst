import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHO1OFDMHo3vRXnz-eO0EF3NEIzjrEeEk",
    authDomain: "registration-app-8755b.firebaseapp.com",
    projectId: "registration-app-8755b",
    storageBucket: "registration-app-8755b.appspot.com",
    messagingSenderId: "308707683270",
    appId: "1:308707683270:web:76c56c7da8a98cf137e0c7",
    measurementId: "G-NHG4VD277B"
};

// Get a Firestore instance
export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore()
// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true, merge: true })