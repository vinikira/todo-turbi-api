const firebase = require('firebase-admin')
const {
  FIREBASE_DATABASE_URL,
  FIREBASE_CREDENTIAL_FILE
} = process.env

const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(FIREBASE_CREDENTIAL_FILE),
  databaseURL: FIREBASE_DATABASE_URL
})

module.exports = {
  db: firebaseApp.database()
}
