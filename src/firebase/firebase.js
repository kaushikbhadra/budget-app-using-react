// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import * as firebaseAuth from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import * as firebase from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const authApp = firebaseAuth.getAuth(app)

const analytics = getAnalytics(app)
// Get a reference to the database service
const database = firebase.getDatabase(app)

export { firebase, firebaseAuth, authApp, database as default }
