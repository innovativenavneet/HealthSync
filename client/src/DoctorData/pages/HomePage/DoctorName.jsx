import { useEffect, useState } from "react"
import { useUserAuth } from "../../../context/UserAuthContext";



const DoctorName= ()=>
{
    const [doctorName , setDoctorName] = useState("Dr. Jhon Doe"); //to hold the doctor's Name

    const {user} = useUserAuth();
    console.log("this is user from the useuserauth",user);
    

    // doctorName comming from the API



return (
    <>
<div className="bg-[var(--light-blue)] pt-4 pb-4">
  <div className="container ml-4">
    <div className="flex justify-between items-center w-[381px] h-[34px]">
      <p className="text-[23px] leading-[34.05px]">
        Good Morning, 
        <span className="font-semibold w-[381px] h-[34px]"> {user.displayName || user.email}</span>
      </p>
    </div>
  </div>
</div>

    </>
)

};

export default DoctorName;