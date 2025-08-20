import type { JSX } from "react";
import { Link, Outlet } from "react-router";

import { PATHS } from "router/types";

export const MainLayout = ({ children = <Outlet /> }: Props) => {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="top-navigation">
            <Link to={PATHS.Dashboard}>Dashboard</Link>
            <Link to={PATHS.Transactions}>Transactions</Link>
          </nav>
        </div>
      </header>
      <div className="container">{children}</div>
    </>
  );
};

type Props = {
  children?: JSX.Element;
};
