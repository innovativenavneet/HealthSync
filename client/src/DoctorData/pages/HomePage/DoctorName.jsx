import { useEffect, useState } from "react"


const DoctorName= ()=>
{
    const [doctorName , setDoctorName] = useState("Dr. Jhon Doe"); //to hold the doctor's Name


    // doctorName comming from the API

    useEffect( ()=>{
        const fetchDoctorName = async () => {
            try{
                const response = await fetch("   "); // replace with the actual api
                const data = await response.json();
                setDoctorName(data.doctorName);
            }
            catch(error)
            {
                console.error("Error fetching the Doctor's Name", error);
                setDoctorName("Dr. Jhon Doe") // if api didn't fetched then default doctor name
            }
        };
        fetchDoctorName();
    },[]) // it will call once


return (
    <>
     <div className="bg-[var(--light-blue)] pt-4 pb-4">
        <div className="container ml-4">
            <div className="flex justify-between items-center w-[381px] h-[34px] ">
                <p className="text-[23px] leading-[34.05px] font-semibold ">
                    Good Morning, {doctorName}
                </p>
            </div>
        </div>
    </div>
    </>
)

};

export default DoctorName;