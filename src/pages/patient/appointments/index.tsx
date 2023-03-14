import React from "react";
import { NextPage } from "next";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import Appointments from "@/views/Appointments/Appointments";

const AppointmentsPage: React.FC<NextPage> = () => {
  return (
    <DashboardNavbar>
      <Appointments />
    </DashboardNavbar>
  );
};

export default AppointmentsPage;
