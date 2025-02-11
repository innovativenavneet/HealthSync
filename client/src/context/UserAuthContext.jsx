import { createContext, useEffect, useState, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../FireBase/firebaseConfig";

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [uid, setUid] = useState(null);
    const [role, setRole] = useState(null);

    // Function to save user data to Firestore
    const saveUserToFirestore = async (uid, email, role) => {
        try {
            const userDocRef = doc(db, "Users", uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    email,
                    role,
                    createdAt: new Date(),
                });
                console.log("User data saved in Firestore");
            } else {
                console.log("User already exists in Firestore");
            }
        } catch (err) {
            console.error("Error saving user data to Firestore:", err);
        }
    };

    // Signup function
    async function signup(email, password, role) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            setUser(userCredential.user);
            setUid(uid);
            setRole(role);

            await saveUserToFirestore(uid, email, role);
            return userCredential;
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    }

    // Login function
    async function login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            setUser(userCredential.user);
            setUid(uid);

            // Fetch user role from Firestore
            const userDocRef = doc(db, "Users", uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const fetchedRole = userDoc.data().role;
                setRole(fetchedRole);
            } else {
                throw new Error("User role not found in Firestore.");
            }
            return userCredential;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    // Logout function
    function logOut() {
        setUser(null);
        setUid(null);
        setRole(null);
        localStorage.removeItem("userRole"); // Clear cached role
        return signOut(auth);
    }

    // Google sign-in function
    async function signInWithGoogle(role) {
        try {
            if (!["DOCTOR", "PATIENT"].includes(role)) {
                throw new Error("Invalid role selected");
            }
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const uid = userCredential.user.uid;
            setUser(userCredential.user);
            setUid(uid);
            setRole(role);

            await saveUserToFirestore(uid, userCredential.user.email, role);
            return userCredential;
        } catch (error) {
            console.error("Google Sign-In error:", error);
            throw error;
        }
    }

    // Track authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserAuthContext.Provider value={{ user, role, uid, signup, login, logOut, signInWithGoogle }}>
            {children}
        </UserAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(UserAuthContext);
}
