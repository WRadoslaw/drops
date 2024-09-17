import { Sun } from "../components/Sun";
import { Planets } from "../components/Planets";
import { Outlet } from "react-router-dom";
import { TopBar } from "../components/TopBar";

export const MainContent = () => {
  return (
    <>
      <TopBar />
      <Sun />
      <Planets />
      <Outlet />
    </>
  );
};
