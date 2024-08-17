import React, { useState } from "react";

interface SidebarProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onGenerate, isLoading }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleGenerate = () => {
    if (inputValue.trim()) {
      onGenerate(inputValue.trim());
    }
  };

  return (
    <aside className="sidebar">
      <div>
        <p>Generate Flowchart</p>
        <textarea
          placeholder="Enter prompt for flowchart generation"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ marginBottom: "0.8rem", padding: "10px", borderRadius: '5px', width: '100%', height: '100px' }}
        />
        <button 
          className="sideBarButton" 
          style={{ width: '100%' }} 
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;