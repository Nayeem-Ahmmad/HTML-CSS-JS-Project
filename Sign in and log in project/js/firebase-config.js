const firebaseConfig = {
  apiKey: "AIzaSyCy-Vv7CQJ_HVVkNbLqIeyDim-traLfUnA",
  authDomain: "login-demo-e24e1.firebaseapp.com",
  projectId: "login-demo-e24e1",
  storageBucket: "login-demo-e24e1.appspot.com",
  messagingSenderId: "260536873294",
  appId: "1:260536873294:web:05cc015afb3e6974716e1f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
