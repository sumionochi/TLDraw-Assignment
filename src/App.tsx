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
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    try {
      const generatedContext = await generateContext(prompt);
      setContext(generatedContext);
      setGeneratedPrompt(prompt);
      console.log(generatedContext);
    } catch (error) {
      console.error("Error generating context:", error);
      alert("Failed to generate context. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (generatedPrompt) {
      await handleGenerate(generatedPrompt);
    }
  };

  return (
    <div className="app">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="content-container">
        {isSidebarVisible && (
          <Sidebar 
            onGenerate={handleGenerate} 
            onRegenerate={handleRegenerate} 
            isLoading={isLoading} 
            // Show regenerate button only if there's a previous prompt
            canRegenerate={!!generatedPrompt} 
          />
        )}
        <TldrawComponent context={context} />
      </div>
    </div>
  );
}
