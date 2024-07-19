import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";

function AdminLayout({ children }) {
  return (
    <div className="d-flex">
      <SideBar />
      <div className="flex-grow-1">
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
