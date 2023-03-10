import React from "react";
import { NextPage } from "next";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import TransferRequests from "@/views/TransferRequests/TransferRequests";

const TransferRequestsPage: React.FC<NextPage> = () => {
  return (
    <DashboardNavbar>
      <TransferRequests />
    </DashboardNavbar>
  );
};

export default TransferRequestsPage;
