import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

import AuthContext from './AuthContext';
import auth from '../firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';







const AuthProvider = ({children}) => {
  const [user , setUser] =useState(null)
  const [loading , setLoading] =useState(true)
  const axiosPublic = useAxiosPublic()
  const googleProvider = new GoogleAuthProvider()

  const createUser =(email , password) =>{

    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }


  const updateProfileUser = (name , photo ) =>{
 return updateProfile(auth.currentUser ,{
  displayName:name , photoURL:photo
 })
  }



  useEffect(() =>{
    const unsubscriber = onAuthStateChanged( auth, currentUser =>{
      setUser(currentUser)
     if(currentUser){
      const userInfo = {
        email : currentUser.email
      }

      axiosPublic.post('/jwt' , userInfo)
      .then (res =>{
        if(res.data.token){
          localStorage.setItem('access-token', res.data.token)
        }
      })

     }
     else{
localStorage.removeItem('access-token')
     }
      setLoading(false)
    })
    return () =>{
      unsubscriber()
    }

  },[axiosPublic])

  const signIn =(email , password) =>{

    setLoading(true)
    return signInWithEmailAndPassword( auth , email, password)
  }

  const signOutUser =() =>{

    setLoading(true)
    return signOut(auth)
  }


  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  };


  const authInfo ={
    user,
    loading,
    createUser,
    signIn,
    updateProfileUser,
    googleSignIn,
    signOutUser
 

  }
 
  return (
   <AuthContext.Provider value={authInfo}>
    {children}
   </AuthContext.Provider>
  );
};

export default AuthProvider;
