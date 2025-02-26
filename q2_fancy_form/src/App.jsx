import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ContactUs from "./components/ContactUs.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import SwapPane from "./components/swappane/SwapPane.jsx";
import Tokens from "./components/Tokens.jsx";

const pageList = ["Swap", "Tokens", "Contact Us"];

function App() {
  const [displayedPage, setDisplayedPage] = useState("Swap");

  const handleNavClick = (title) => {
    setDisplayedPage(title);
  };

  return (
    <>
      <Navbar pages={pageList} handleNavClick={handleNavClick} />
      {displayedPage === "Swap" && <SwapPane />}
      {displayedPage === "Tokens" && <Tokens />}
      {displayedPage === "Contact Us" && <ContactUs />}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
