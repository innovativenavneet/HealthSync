import { createContext, useEffect, useState, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

import { auth } from "../FireBase/firebaseConfig";

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null); // State to store user object
    const [uid, setUid] = useState(null); // State to store user UID

    // Signup function
    async function signup(email, password) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          setUser(userCredential.user); // Update the user state
          setUid(userCredential.user.uid); // Update the UID state
          return userCredential; // Return the userCredential object
        } catch (error) {
          throw error; // Propagate the error to the calling function
        }
      }

    // Login function
    async function login(email, password) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          setUser(userCredential.user); // Update the user state
          setUid(userCredential.user.uid); // Update the UID state
          return userCredential; // Return the userCredential object
        } catch (error) {
          throw error; // Propagate the error to the calling function
        }
      }
      

    // Logout function
    function logOut() {
        setUser(null);
        setUid(null);
        return signOut(auth);
    }

    // Google sign-in function
    async function signInWithGoogle() {
        try {
          const provider = new GoogleAuthProvider();
          const userCredential = await signInWithPopup(auth, provider); // Wait for the sign-in popup
          setUser(userCredential.user); // Update the user state
          // console.log(userCredential.user.displayName);
          
          setUid(userCredential.user.uid); // Update the UID state
          return userCredential; // Return the userCredential object
        } catch (error) {
          throw error; // Propagate the error to the calling function
        }
      }
      

    // Keep track of authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // setUid(currentUser?.uid || null); // Save UID if user is logged in
        });

        // Return the unsubscribe function for cleanup
        return () => unsubscribe();
    }, []);

    return (
        <UserAuthContext.Provider value={{ user, uid, signup, login, logOut, signInWithGoogle }}>
            {children}
        </UserAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(UserAuthContext);
}
