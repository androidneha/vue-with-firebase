 import firebase from 'firebase'
 import firestore from 'firebase/firestore'
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAEZY6ttofLp6OFyqiUqZtVV0Q5RDBG31E",
    authDomain: "ninja-smoothies-c1ec5.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-c1ec5.firebaseio.com",
    projectId: "ninja-smoothies-c1ec5",
    storageBucket: "ninja-smoothies-c1ec5.appspot.com",
    messagingSenderId: "265570257770"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({timestampsInSnapshots:     true})


export default firebaseApp.firestore()