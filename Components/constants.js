import firebase from 'firebase'


// Initialize Firebase
const config = {
	apiKey: "AIzaSyB3D5qNKrB84_6taX8hyBxgqkyacfsPixM",
	authDomain: "emergency-notif.firebaseapp.com",
	databaseURL: "https://emergency-notif.firebaseio.com",
	projectId: "emergency-notif",
	storageBucket: "emergency-notif.appspot.com",
	messagingSenderId: "850229492357"
};

firebase.initializeApp(config);
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
