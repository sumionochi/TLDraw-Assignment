import { useState } from "react";
import TldrawComponent from "./TldrawComponent";
import Sidebar from "./components/Sidebar";
import "./index.css";
import Navbar from "./components/Navbar";

export default function App() {
  const [count, setCount] = useState<number>(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const handleGenerate = (newCount: number) => {
    setCount(newCount);
    console.log("Setting count:", newCount);
  };

  return (
    <div className="app">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="content-container">
        {isSidebarVisible && <Sidebar onGenerate={handleGenerate} itemCount={count} />}
        <TldrawComponent count={count} />
      </div>
    </div>
  );
}
