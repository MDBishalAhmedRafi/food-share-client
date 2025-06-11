import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({children}) => {
                const provider = new GoogleAuthProvider()
                const [user, setUser] = useState(null);
                const [loading, setLoading] = useState(true)
                // console.log(loading, user);
                
                const createUser = (email, password) => { 
                                setLoading(true);
                                return createUserWithEmailAndPassword(auth, email, password)
                };

                const logIn = (email, password) => { 
                                setLoading(true);
                                return signInWithEmailAndPassword(auth, email, password)
                }

                const updateUser = (updatedData) => { 
                                return updateProfile(auth.currentUser, updatedData)
                }

                const googleLogIn = () => { 
                                return signInWithPopup(auth, provider)
                }

                const logOut = () => { 
                                return signOut(auth);
                }

                const forgetPass = (email) => { 
                                return sendPasswordResetEmail(auth, email)
                }

                
                useEffect(()=> { 
                                const usSubscribe = onAuthStateChanged(auth, (currentUser) => { 
                                                setUser(currentUser);
                                                setLoading(false)
                                                
                                })
                                return () => { 
                                                usSubscribe();
                                                
                                }
                }, [])
                const authData = { 
                user,
                setUser,
                createUser,
                logOut,
                logIn,
                googleLogIn,
                updateUser,
                loading,
                setLoading,
                forgetPass,
                }
                return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;