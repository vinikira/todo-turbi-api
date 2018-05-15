const path = require('path')
const firebase = require('firebase-admin')
const {
  FIREBASE_DATABASE_URL,
  FIREBASE_CREDENTIAL_FILE
} = process.env
const filePath = path.resolve(FIREBASE_CREDENTIAL_FILE)

const firebaseApp = firebase.initializeApp({
  credential: firebase.credential.cert(filePath),
  databaseURL: FIREBASE_DATABASE_URL
})

module.exports = {
  db: firebaseApp.database()
}
