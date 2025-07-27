// config/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json"); // path to your downloaded key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
