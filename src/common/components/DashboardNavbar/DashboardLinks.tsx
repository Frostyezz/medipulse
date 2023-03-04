import React from "react";
import useGetDashboardLinks from "@/common/hooks/useGetDashboardLinks";
import Link from "next/link";
import { useDashboardNavbarStyles } from "./DashboardNavbar.styles";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const DashboardLinks: React.FC = () => {
  const { classes, cx } = useDashboardNavbarStyles();
  const links = useGetDashboardLinks();
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      {links.map((item) => (
        <Link
          className={cx(classes.link, {
            [classes.linkActive]: item.to === router.pathname,
          })}
          href={item.to}
          key={item.label}
        >
          <item.icon className={cx(classes.linkIcon, "icon")} />
          <span>{t(item.label)}</span>
        </Link>
      ))}
    </>
  );
};

export default DashboardLinks;
