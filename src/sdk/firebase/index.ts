// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

interface firebaseConfig {
  apiKey?: string
  authDomain?: string
  databaseURL?: string
  projectId?: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
  measurementId?: string
}
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: 'AIzaSyBHQ54--n5wkIC9nqL5p6wOnD9FQ6IXv1k',
  authDomain: 'smart-home-2022-2a3c4.firebaseapp.com',
  databaseURL: 'https://smart-home-2022-2a3c4-default-rtdb.firebaseio.com',
  projectId: 'smart-home-2022-2a3c4',
  storageBucket: 'smart-home-2022-2a3c4.appspot.com',
  messagingSenderId: '1033715427049',
  appId: '1:1033715427049:web:cde27a3f7d884567c1f278',
  measurementId: 'G-JRWVLGTL6K'
}
// const analytics = getAnalytics(app as firebaseConfig)
const app = initializeApp(firebaseConfig)
export default app
