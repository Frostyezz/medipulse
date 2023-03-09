import React from "react";
import { NextPage } from "next";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import Patients from "@/views/Patients/Patients";

const PatientsPage: React.FC<NextPage> = () => {
  return (
    <DashboardNavbar>
      <Patients />
    </DashboardNavbar>
  );
};

export default PatientsPage;
