import Header from "../../components/common/Header"; 
import DoctorName from "./DoctorName";
import UpcommingConsultations from "./UpcommingConsultations";
import RecentPatient from "./RecentPatient";
import TodaysTasks from "./TodaysTask";

const HomePage  = ()=>
{
    return(
        <div className="bg-[var(--light-blue)]">
            <Header/>
            <DoctorName/>
            <UpcommingConsultations/>
            <RecentPatient/>
            <TodaysTasks/>
        </div>
    )
}

export default HomePage;