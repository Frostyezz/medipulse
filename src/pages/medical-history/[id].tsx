import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import MedicalHistory from "@/views/MedicalHistory/MedicalHistory";
import DashboardNavbar from "@/common/components/DashboardNavbar";

const MedicalHistoryPage: React.FC<NextPage> = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <DashboardNavbar>
      <MedicalHistory id={(id as string) ?? ""} />
    </DashboardNavbar>
  );
};

export default MedicalHistoryPage;
