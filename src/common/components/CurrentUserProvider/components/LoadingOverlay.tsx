import React, { useEffect, useRef, useState } from "react";
import { Overlay } from "@mantine/core";
import Logo from "../../Logo";
import useFetchCurrentUser from "@/common/hooks/useFetchCurrentUser";

const LoadingOverlay: React.FC = () => {
  const loading = useFetchCurrentUser();
  const [unmountDelay, setUnmountDelay] = useState(false);
  const hasUnmounted = useRef(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (!loading) {
      setUnmountDelay(true);
      timeout = setTimeout(() => {
        setUnmountDelay(false);
        hasUnmounted.current = true;
      }, 3200);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [loading]);

  if (!loading && !unmountDelay && hasUnmounted.current) return <></>;

  return (
    <Overlay
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
      }}
      className={
        unmountDelay
          ? "animate__animated animate__fadeOut animate__delay-2s"
          : ""
      }
      zIndex={999999}
      color="#ffffff"
      opacity={1}
    >
      <Logo
        className="animate__animated animate__fadeInUp" 
        width={180}
        height={180}
      />
    </Overlay>
  );
};

export default LoadingOverlay;
