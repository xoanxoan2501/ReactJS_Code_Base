// Import the functions you need from the SDKs you need
import CONFIG from '@/config'
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: CONFIG.API_KEY,
  authDomain: CONFIG.AUTH_DOMAIN,
  projectId: CONFIG.PROJECT_ID,
  storageBucket: CONFIG.STORAGE_BUCKET,
  messagingSenderId: CONFIG.MESSAGING_SENDER_ID,
  appId: CONFIG.APP_ID,
  measurementId: CONFIG.MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
