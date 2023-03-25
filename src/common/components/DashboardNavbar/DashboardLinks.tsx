import React from "react";
import Link from "next/link";
import useGetDashboardLinks from "@/common/hooks/useGetDashboardLinks";
import { useDashboardNavbarStyles } from "./DashboardNavbar.styles";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Ftu from "../FTU/Ftu";

const DashboardLinks: React.FC = () => {
  const { classes, cx } = useDashboardNavbarStyles();
  const links = useGetDashboardLinks();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <Ftu />
      {links.map((item, idx) => (
        <div key={item.label} className={`step${idx}`}>
          <Link
            className={cx(classes.link, {
              [classes.linkActive]: item.to === router.asPath,
            })}
            href={item.to}
          >
            <item.icon className={cx(classes.linkIcon, "icon")} />
            <span>{t(item.label)}</span>
          </Link>
        </div>
      ))}
    </>
  );
};

export default DashboardLinks;
