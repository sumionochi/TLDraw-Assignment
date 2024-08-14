import { useState } from "react";
import TldrawComponent from "./TldrawComponent";
import Sidebar from "./components/Sidebar";
import "./index.css";
import Navbar from "./components/Navbar";

export default function App() {
  const [count, setCount] = useState<number>(0);

  const handleGenerate = (newCount: number) => {
    setCount(newCount);
    console.log("Setting count:", newCount);
  };

  return (
    <div className="app">
      <Navbar/>
      <div className="">
        <TldrawComponent count={count} />
        <Sidebar onGenerate={handleGenerate} />
      </div>
    </div>
  );
}