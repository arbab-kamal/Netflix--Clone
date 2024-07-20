/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";
const firebaseConfig = {
    apiKey: "AIzaSyBY5gZNFHX6rZp6Pu2_0EdVO3xDWQUzfjk",
    authDomain: "netflix-clone-f0efc.firebaseapp.com",
    projectId: "netflix-clone-f0efc",
    storageBucket: "netflix-clone-f0efc.appspot.com",
    messagingSenderId: "645469569842",
    appId: "1:645469569842:web:d5b2163d64248ee2c54d2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "Local",
            email,

        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = async () => {
    signOut(auth)
}

export { auth, login, db, logout, signup }