import { firebaseAuth, authApp } from '../firebase/firebase'
const provider = new firebaseAuth.GoogleAuthProvider()

export const login = (uid) => ({
  type: 'LOGIN',
  uid,
})

export const startLogin = () => {
  return () => {
    return firebaseAuth.signInWithPopup(authApp, provider)
    // .then((result) => {
    //   const credential =
    //     firebaseAuth.GoogleAuthProvider.credentialFromResult(result)
    //   credential.accessToken
    //   result.user
    // })
  }
}

export const logout = () => ({
  type: 'LOGOUT',
})

export const startLogout = () => {
  return () => {
    return firebaseAuth.signOut(authApp)
  }
}
