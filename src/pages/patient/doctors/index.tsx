import React from "react";
import { NextPage } from "next";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import DoctorsNearYou from "@/views/DoctorsNearYou/DoctorsNearYou";

const DoctorsPage: React.FC<NextPage> = () => {
  return (
    <DashboardNavbar>
      <DoctorsNearYou />
    </DashboardNavbar>
  );
};

export default DoctorsPage;
