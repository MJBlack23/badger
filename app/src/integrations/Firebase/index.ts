import firebase from 'firebase'

firebase.initializeApp({
  apiKey: process.env['BADGER_API_KEY'],
  authDomain: process.env['BADGER_AUTH_DOMAIN'],
  databaseURL: process.env['BADGER_DATABASE_URL'],
  projectId: process.env['BADGER_PROJECT_ID'],
  storageBucket: process.env['BADGER_STORAGE_BUCKET'],
  messagingSenderId: process.env['BADGER_MESSAGE_SENDER_ID'],
  appId: process.env['BADGER_APP_ID']
})

export * as Auth from './Auth'