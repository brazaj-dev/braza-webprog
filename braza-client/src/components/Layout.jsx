import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-grey-150 text-zinc-1100">
      <NavBar />
      <main className="flex-6 pb-50 pt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
