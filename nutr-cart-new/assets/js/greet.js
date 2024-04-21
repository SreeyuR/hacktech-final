
// import { updateUserName } from "./login.js"

// updateUserName();


// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDZz0AonEUGTTqSnIoizPwf_GI9flU7L54",
//     authDomain: "login-page-demo-5c1d2.firebaseapp.com",
//     projectId: "login-page-demo-5c1d2",
//     storageBucket: "login-page-demo-5c1d2.appspot.com",
//     messagingSenderId: "999655653673",
//     appId: "1:999655653673:web:98141bee89d6f5b59f7738"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// // Initialize variables
// const auth = firebase.auth()
// const database = firebase.database()

// var usersRef = database.ref('users')

// usersRef.once('value', function(snapshot) {
// 	snapshot.forEach(function(childSnapshot) {
// 	  var childData = childSnapshot.val();
// 	  var name = childData.name;
// 	//   var email = childData.email;
// 	  // Update the HTML element with the retrieved name
// 	  document.getElementById('user-name').innerText = name;
// 	});
//   });