import { useState } from "react";
import TldrawComponent from "./TldrawComponent";
import Sidebar from "./components/Sidebar";
import "./index.css";
import { generateContext } from './utils/openai';
import Navbar from "./components/Navbar";

export default function App() {
  const [context, setContext] = useState<string>("");
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    try {
      const generatedContext = await generateContext(prompt);
      setContext(generatedContext);
      console.log(generatedContext);
    } catch (error) {
      console.error("Error generating context:", error);
      alert("Failed to generate context. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="content-container">
        {isSidebarVisible && (
          <Sidebar 
            onGenerate={handleGenerate} 
            isLoading={isLoading} 
          />
        )}
        <TldrawComponent context={context} />
      </div>
    </div>
  );
}