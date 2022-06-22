import AdminDashboard from "../components/AdminDashboard";
import { useSelector } from "react-redux";
import GuestDashboard from "../components/GuestDashboard";
import ManagerDashboard from "../components/ManagerDashboard";
import RecDashboard from "../components/RecDashboard";
import HRBPDashboard from "../components/HRBPDashboard";

function Dashboard() {
  const {user} = useSelector((state) => state.auth)
  const {guest} = useSelector((state) => state.guest)

  const handleRole = () => {
    if(user && user.role === "admin"){
      return <AdminDashboard />
    } else if (user && user.role === "recruiter") {
      return <RecDashboard />
    } else if (user && user.role === "manager") {
      return <ManagerDashboard />
    } else if (user && user.role === "hrbp") {
      return <HRBPDashboard />
    } else if (guest) {
      return <GuestDashboard />
    } else {
      return "Unauthorized"
    }

  }


  return (
    <div>
       {handleRole()}
    </div>
  );
}

export default Dashboard;
