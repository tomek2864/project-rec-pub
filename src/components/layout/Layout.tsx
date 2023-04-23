import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <main className="min-h-screen bg-[#F0F0F0]">
    <Header />
    <Outlet />
  </main>
);
export default Layout;
