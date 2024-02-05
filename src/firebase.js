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
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
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
const gamesRef = collection(db, 'games')

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

async function startTimer(documentId) {
  // const gamesRef = collection(db, 'games')
  await setDoc(doc(db, 'games', documentId), {
    // id: documentId,
    startAt: serverTimestamp(),
  })
}

async function endTimer(documentId) {
  const gameRef = doc(db, 'games', documentId)
  await updateDoc(gameRef, {
    endAt: serverTimestamp(),
  })
  console.log(gameRef)
  const updatedDoc = await getDoc(gameRef)
  const game = updatedDoc.data()
  console.log(game.startAt.toDate())
  let start = new Date(game.startAt.toDate())
  let end = new Date(game.endAt.toDate())
  console.log(convertTime(end - start))
}

function convertTime(input) {
  let seconds = Math.floor(input / 1000)
  let ms = input - seconds * 1000
  let m = Math.floor(seconds / 60)
  let s = seconds - m * 60

  let duration = m + ':' + s + '.' + ms
  console.log(duration)
}

// async function saveScore(name, documentId) {
//   const gameRef = doc(db, 'games', documentId)
//   const gameSnapshot = await getDoc(gameRef)
//   const game = gameSnapshot.data()

//   let start = new Date(game.startAt.toDate())
//   let end = new Date(game.endAt.toDate())

//   await addDoc(db, 'scores', {
//     game: documentId,
//     name: name,
//     score: end - start,
//   })
// }

// async function getScores() {
//   const q = query(collection(db, 'scores'))
//   const querySnapshot = await getDocs(q)
//   const documents = querySnapshot.docs.map((doc) => doc.data())
//   return documents
// }

async function getScores() {
  const q = query(gamesRef, where('name', '!=', null))
  const querySnapshot = await getDocs(q)
  const games = querySnapshot.docs.map((doc) => doc.data())
  let scores = []
  games.forEach((game) => {
    let start = new Date(game.startAt.toDate())
    let end = new Date(game.endAt.toDate())
    scores.push({
      name: game.name,
      score: end - start,
    })
  })
  return scores
}

export { createDocument, getDocuments, validateCoords, startTimer, endTimer, saveScore, getScores }
