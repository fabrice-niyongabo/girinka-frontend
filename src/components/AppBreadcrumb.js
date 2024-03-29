import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import labRoutes from "../sub-routes/lab";
import districtRoutes from "../sub-routes/district";

import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import { useSelector } from "react-redux";

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;
  const { role } = useSelector((state) => state.user);
  const [routesToUse, setRoutesToUse] = useState([]);

  useEffect(() => {
    if (role === "admin") {
      setRoutesToUse(labRoutes);
    }
    if (role === "district") {
      setRoutesToUse(districtRoutes);
    }
  }, [role]);

  const getRouteName = (pathname, routesToUse) => {
    const currentRoute = routesToUse.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split("/").reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routesToUse);
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active
              ? { active: true }
              : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        );
      })}
    </CBreadcrumb>
  );
};

export default React.memo(AppBreadcrumb);
