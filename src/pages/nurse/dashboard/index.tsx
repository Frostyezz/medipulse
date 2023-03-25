import { NextPage } from "next";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import Dashboard from "@/views/Dashboard/Dashboard";

const MedicDashboard: React.FC<NextPage> = () => {
  return (
    <DashboardNavbar>
      <Dashboard />
    </DashboardNavbar>
  );
};

export default MedicDashboard;
