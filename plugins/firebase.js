import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAEcsIctkZtlj7lyJRLR1vyU2-YsjKegvA",
    authDomain: "brainstorm635com.firebaseapp.com",
    projectId: "brainstorm635com",
    storageBucket: "brainstorm635com.appspot.com",
    messagingSenderId: "1038533817365",
    appId: "1:1038533817365:web:fe2b61106fb29282c54a1c",
    measurementId: "G-S71D9WZ9WP"
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : ''

export default function ({ }, inject) {
    inject('firebase', firebase)
}
