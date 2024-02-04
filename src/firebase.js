// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import {
  getFirestore,
  collection,
  doc,
  query,
  where,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCwiQahFCLZyjpDyMCdsjRm3t2tD8Vg2BM',
  authDomain: 'wheres-honnold.firebaseapp.com',
  projectId: 'wheres-honnold',
  storageBucket: 'wheres-honnold.appspot.com',
  messagingSenderId: '529937075589',
  appId: '1:529937075589:web:a50eefbe90de29faf488ec',
  measurementId: 'G-HDHYMN5B1F',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
// const analytics = getAnalytics(firebaseApp)
const db = getFirestore(firebaseApp)

const featuresRef = collection(db, 'features')

const createDocument = (collectionName, document) => {
  const collectionRef = collection(db, collectionName)
  return addDoc(collectionRef, document)
}

async function getDocuments(collectionName) {
  const collectionRef = collection(db, collectionName)
  const collectionSnapshot = await getDocs(collectionRef)
  const documents = collectionSnapshot.docs.map((doc) => doc.data())
  return documents
}

async function validateCoords(featureName, coords) {
  const q = query(featuresRef, where('name', '==', featureName))
  const querySnapshot = await getDocs(q)
  const documents = querySnapshot.docs.map((doc) => doc.data())
  const feature = documents[0]
  console.log('feature: ', feature)
  console.log(coords)
  console.log(feature.x, feature.y)
  if (
    coords.x > feature.x - 20 &&
    coords.x < feature.x + 20 &&
    coords.y > feature.y - 20 &&
    coords.y < feature.y + 20
  ) {
    return true
  }
  return false
}

export { createDocument, getDocuments, validateCoords }
