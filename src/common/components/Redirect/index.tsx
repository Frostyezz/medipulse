import React, { useEffect } from "react";
import { ROUTES } from "@/common/utils/routes";
import { useRouter } from "next/router";

interface RedirectProps {
  to: ROUTES;
  replace?: boolean;
}

const Redirect: React.FC<RedirectProps> = ({ to, replace }) => {
  const router = useRouter();

  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, []);

  return <></>;
};

export default Redirect;
