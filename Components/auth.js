import { ref, firebaseAuth } from './constants'

export function auth (email, password){
	return firebaseAuth().createUserWithEmailAndPassword(email, password)
		.then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      full_name: user.fullname,
      birthDate: user.date,
      gender: user.gender,
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}