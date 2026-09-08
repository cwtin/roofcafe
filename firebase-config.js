const firebaseConfig = {
  apiKey: "AIzaSyBDz3sqb_10_dvm-Ho-5FSST9UlNX8AK5Y",
  authDomain: "roofcafe-b4207.firebaseapp.com",
  databaseURL: "https://roofcafe-b4207-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "roofcafe-b4207",
  storageBucket: "roofcafe-b4207.firebasestorage.app",
  messagingSenderId: "346737898782",
  appId: "1:346737898782:web:7a87e0bf3eb534c6ee450f",
  measurementId: "G-WVY7EN89V4"
};

firebase.initializeApp(firebaseConfig);
window.roofDb = firebase.database();
window.roofAuth = firebase.auth();
