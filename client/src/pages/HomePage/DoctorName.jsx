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
     <div className="bg-[var(--light-blue)] p-8">
        <div className="container mx-auto">
            <div className="flex justify-between items-center ">
                <h1 className="text-[25px] leading-[34.05px] font-semibold w-[381px] h-[34px]">
                    Good Morning, {doctorName}
                </h1>
            </div>
        </div>
    </div>
    </>
)

};

export default DoctorName;