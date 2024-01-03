import { Outlet } from "react-router-dom";

import Topbar from "../../@/components/shared/Topbar";
import LeftSidebar from "../../@/components/shared/LeftSidebar";
import Bottombar from "../../@/components/shared/Bottombar";

const RootLayout = () => {
  return (
    <div className="md:flex h-full">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  )
}

export default RootLayout;