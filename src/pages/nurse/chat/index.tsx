import React from "react";
import { NextPage } from "next";
import DashboardNavbar from "@/common/components/DashboardNavbar";
import Chat from "@/views/Chat/Chat";

const ChatPage: React.FC<NextPage> = () => {
  return (
    <DashboardNavbar>
      <Chat />
    </DashboardNavbar>
  );
};

export default ChatPage;
