import { initializeApp } from 'firebase/app'
import * as providers from 'firebase/auth'
import * as firestore from 'firebase/firestore'

export default function (context, inject) {
    const firebaseConfig = {
        apiKey: "AIzaSyAEcsIctkZtlj7lyJRLR1vyU2-YsjKegvA",
        authDomain: "brainstorm635com.firebaseapp.com",
        projectId: "brainstorm635com",
        storageBucket: "brainstorm635com.appspot.com",
        messagingSenderId: "1038533817365",
        appId: "1:1038533817365:web:fe2b61106fb29282c54a1c",
        measurementId: "G-S71D9WZ9WP"
    }

    initializeApp(firebaseConfig)

    const app = { firestore: firestore, providers }

    inject('firebase', app)
}
