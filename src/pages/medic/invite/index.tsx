import { NextPage } from "next";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import Invite from "@/views/Invite/Invite";

const MedicDashboard: React.FC<NextPage> = () => {
  return (
    <DashboardNavbar>
      <Invite />
    </DashboardNavbar>
  );
};

export default MedicDashboard;
