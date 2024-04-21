// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZz0AonEUGTTqSnIoizPwf_GI9flU7L54",
    authDomain: "login-page-demo-5c1d2.firebaseapp.com",
    projectId: "login-page-demo-5c1d2",
    storageBucket: "login-page-demo-5c1d2.appspot.com",
    messagingSenderId: "999655653673",
    appId: "1:999655653673:web:98141bee89d6f5b59f7738"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
//   favourite_song = document.getElementById('favourite_song').value // fav song is age

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Invalid.')
    window.location.href = "index.html#login-pg-real";
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false) { // validate_field(favourite_song) == false
    alert('One or More Fields is Invalid.')
    window.location.href = "index.html#login-pg-real";
    return
  }
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      //favourite_song : favourite_song,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    // alert('New Account Created!')
    window.location.href = "user.html#hi-user";
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert("Incorrect username or password.")//alert(error_message)
    window.location.href = "index.html#login-pg-real";
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is invalid.')
    window.location.href = "index.html#login-pg-real";
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    // alert('User successfully logged in!')
    window.location.href = "user.html#hi-user";

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
    window.location.href = "index.html#login-pg-real";
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
