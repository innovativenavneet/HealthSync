import Header from "../../../components/common/Header"; 
import DoctorName from "./DoctorName";
import UpcommingConsultations from "./UpcommingConsultations";
import RecentPatient from "./RecentPatient";
import TodaysTasks from "../../TodayTask/TodaysTask";

const HomePage  = ()=>
{
    return(
        <div className="bg-[var(--light-blue)] h-[1024px] w-[1440px]">
            <Header/>
            <DoctorName/>
            <UpcommingConsultations/>
            <RecentPatient/>
            <TodaysTasks/>
        </div>
    )
}

export default HomePage;