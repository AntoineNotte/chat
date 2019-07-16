let firebaseConfig = {
    apiKey: "AIzaSyC3WMGi771TnqQHlXYsL-plwXl0iNIi6D8",
    authDomain: "chat-nodejs-f520b.firebaseapp.com",
    databaseURL: "https://chat-nodejs-f520b.firebaseio.com",
    projectId: "chat-nodejs-f520b",
    storageBucket: "",
    messagingSenderId: "499294647461",
    appId: "1:499294647461:web:c4a9e471cb9e74fb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function login() {
    let provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      let token = result.credential.accessToken;
      let user = result.user;

      console.log(user);
    }).catch(function(error) {
      let errorMessage = error.message;
      console.log(errorMessage);

    });

}   
$('#log').on ('click', login);