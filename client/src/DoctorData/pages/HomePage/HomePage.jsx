import Header from "../../../components/common/Header"; 
import DoctorName from "./DoctorName";
import UpcommingConsultations from "./UpcommingConsultations";
import RecentPatient from "./RecentPatient/RecentPatient";
import TodaysTasks from "./TodayTask/TodaysTask";

const HomePage  = ()=>
{
    return(
        <div className="bg-[var(--light-blue)] min-h-screen">
            <Header/>
            <DoctorName/>
            <UpcommingConsultations/>
            <RecentPatient/>
            <TodaysTasks/>
        </div>
    )
}

export default HomePage;