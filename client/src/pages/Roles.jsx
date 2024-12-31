import { useNavigate } from "react-router-dom";


const Roles = () =>
{
    const navigate = useNavigate();
    function handlePatient()
    {
        navigate("/login");
    }
    function handleDoctor()
    {
        navigate("/login");
    }


    return(
        <div className="flex justify-center items-center bg-gray-700 h-[100vh]">
            <div className="bg-slate-500">
                <button onClick={handlePatient} className="h-52 w-56" >Login as Patient??</button>
            </div>
            <div className="bg-slate-600 ">
                <button onClick={handleDoctor} className="h-52 w-56" >Login as Doctor??</button>
            </div>
        </div>
    )

}

export default Roles;