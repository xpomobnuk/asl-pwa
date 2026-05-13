import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCV3raOmUMv5qtXLhr1pMyDp0mbZhvsB6o",
  authDomain: "asl-pwa.firebaseapp.com",
  projectId: "asl-pwa",
  storageBucket: "asl-pwa.firebasestorage.app",
  messagingSenderId: "1009611407240",
  appId: "1:1009611407240:web:b4efbbc5e14447dc7f843d"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)