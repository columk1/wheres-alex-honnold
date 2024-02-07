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
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore'
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
  // console.log(gameRef)
  const updatedDoc = await getDoc(gameRef)
  const game = updatedDoc.data()
  // console.log('start at date: ', game.startAt.toDate())
  // console.log('end at date: ', game.endAt.toDate())
  let start = new Date(game.startAt.toDate())
  let end = new Date(game.endAt.toDate())
  return convertTime(end - start)
  // console.log('converted time: ', convertTime(end - start))
}

function convertTime(input) {
  let seconds = Math.floor(input / 1000)
  let ms = input - seconds * 1000
  let m = Math.floor(seconds / 60) || ''
  let s = seconds - m * 60

  m = m ? m + 'm' : ''

  let duration = m + s + '.' + ms + 's'
  return duration
}

async function saveScore(documentId, name) {
  if (!name) return

  const gameRef = doc(db, 'games', documentId)
  const gameSnapshot = await getDoc(gameRef)
  const game = gameSnapshot.data()

  let start = new Date(game.startAt.toDate())
  let end = new Date(game.endAt.toDate())

  await addDoc(collection(db, 'scores'), {
    gameId: documentId,
    name: name,
    score: parseInt(end - start),
  })
  return { name: name, time: end - start }
}

async function getScores() {
  const q = query(collection(db, 'scores'), orderBy('score'), limit(10))
  const querySnapshot = await getDocs(q)
  const documents = querySnapshot.docs.map((doc) => doc.data())
  console.log('getScores: ', documents)
  const scores = documents.map((doc) => {
    return { name: doc.name, time: convertTime(doc.score) }
  })
  return scores
}

export { validateCoords, startTimer, endTimer, saveScore, getScores }
