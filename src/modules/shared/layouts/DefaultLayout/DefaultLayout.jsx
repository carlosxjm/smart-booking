import { Outlet } from "react-router";
import { MainHeader } from "../../components/MainHeader/MainHeader";
import { MainFooter } from "../../components/MainFooter/MainFooter";
import "./DefaultLayout.css";

export const DefaultLayout = () => (
  <div className="default-layout-root">
    <MainHeader />
    <div className="container">
      <Outlet />
    </div>
    <MainFooter />
  </div>
);
