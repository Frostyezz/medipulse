import useFetchCurrentUser from "@/common/hooks/useFetchCurrentUser";
import React from "react";

interface CurrentUserProviderProps {
  children: React.ReactNode;
}

const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({
  children,
}) => {
  useFetchCurrentUser();

  return <>{children}</>;
};

export default CurrentUserProvider;
