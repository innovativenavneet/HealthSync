import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth , onAuthStateChanged } from "firebase/auth";
import app from "../../FireBase/firebaseConfig";
import Header from "../../components/common/Header";


const UpdateProfile = ()=>
{

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [image, setImage] = useState()
    const [number, setNumber] = useState();
    const [address, setAddress] = useState();
    const [licenseNumber, setLicenseNumber] = useState();
    const [experience, setExperience] = useState();
    const [hospitalName, setHospitalName] = useState();
    // const [award, setAward] = useState();



    // adding data to the firestore in the profile section

    async function handleSubmit(e)
    {
        e.preventDefault();
        const db = getFirestore(app);
        const auth = getAuth(app); // initialize the firebase auth
        const user = auth.currentUser; // get the currently authenticated user

        if (!user) {
            console.error("No authenticated user found. Please log in.");
            return;
        }
    
        const profileRef = collection(db,"users", user.uid, "Profile"); // creating the subsection profile on firestore

        try
        {
            await addDoc(profileRef,{
                ProfileId : user.uid,
                Name : name,
                Email : email,
                PhoneNumber : number,
                Address : address,
                LicenseNumber : licenseNumber,
                Experience : experience,
                HospitalName : hospitalName,
                // Award : award,
                Image : image
            });
            console.log("data saved successfully on the database");
            
            setName("");
            setEmail("");
            setNumber("");
            setAddress("");
            setLicenseNumber("");
            setExperience("");
            setHospitalName("");
            // setAward("");
            setImage("");
        }
        catch(err)
        {
            console.log(err)
        }

    }

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
            <label>Image</label>
                <input
                type="file"
                onChange={(e)=>{setImage(e.target.value)}} />


                <label>Name:</label>
                <input
                type="name"
                 placeholder="Full Name"
                onChange={(e)=>{setName(e.target.value)}}
                required
                />

                 <label>Email:</label>
                 <input
                 type="email"
                  placeholder="Email"
                 onChange={(e)=>{setEmail(e.target.value)}} />


                <label>Phone:</label>
                <input 
                type="number"
                 placeholder="Phone Number"
                onChange={(e)=>{setNumber(e.target.value)}} 
                required/>

                <label>Experience:</label>
                <input 
                type="text"
                placeholder="Experience"
                onChange={(e)=>{setExperience(e.target.value)}} />

                <label>Address:</label>
                <input 
                type="text" 
                 placeholder="Address"
                onChange={(e)=>{setAddress(e.target.value)}}/>

                <label>License Number:</label>
                <input 
                type="text" 
                 placeholder="License Number"
                onChange={(e)=>{setLicenseNumber(e.target.value)}}
                required/>

                <label>Hospital Name:</label>
                <input 
                type="Name"
                 placeholder="Hospital Name"
                onChange={(e)=>{setHospitalName(e.target.value)}}
                required/>

                <button type="submit">Submit</button>

            </form>
        </div>
    );
}

export default UpdateProfile;