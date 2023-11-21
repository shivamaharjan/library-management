import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
