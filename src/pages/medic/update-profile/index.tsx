import React from "react";
import { NextPage } from "next";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import UpdateProfile from "@/views/UpdateProfile/UpdateProfile";

const UpdateProfilePage: React.FC<NextPage> = () => {
  return (
    <DashboardNavbar>
      <UpdateProfile />
    </DashboardNavbar>
  );
};

export default UpdateProfilePage;
