import React from "react";
import LoadingOverlay from "./components/LoadingOverlay";

interface CurrentUserProviderProps {
  children: React.ReactNode;
}

const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({
  children,
}) => {
  return (
    <>
      <LoadingOverlay />
      {children}
    </>
  );
};

export default CurrentUserProvider;
