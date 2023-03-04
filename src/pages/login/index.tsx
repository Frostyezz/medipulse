import React from "react";
import { NextPage } from "next";
import RegisterLayout from "@/common/components/RegisterLayout";
import Login from "@/views/Login/Login";

const index: React.FC<NextPage> = () => {
  return (
    <RegisterLayout>
      <Login />
    </RegisterLayout>
  );
};

export default index;
