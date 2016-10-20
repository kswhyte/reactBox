import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCXV_XxK4gXcZfeiwtU9_tuT1ZkBEGrKe0",
  authDomain: "grudge-box-chat.firebaseapp.com",
  databaseURL: "https://grudge-box-chat.firebaseio.com",
  storageBucket: "grudge-box-chat.appspot.com",
  messagingSenderId: "371784424973"
};

export default firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

export function signIn() {
  return firebase.auth().signInWithPopup(provider);
}

export function logOut(){
  return firebase.auth().signOut()
}

export function deleteIdea(id){
  return firebase.database().ref('ideas/' + id).remove()
}

export function updateIdea(id, key , value){

  return firebase.database().ref('ideas/' + id).update({[key] : value})
}

export const reference = firebase.database().ref('ideas');
