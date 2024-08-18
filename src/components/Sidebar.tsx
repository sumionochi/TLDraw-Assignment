import React, { useState } from "react";
import { FaRedo } from "react-icons/fa"; 

interface SidebarProps {
  onGenerate: (prompt: string) => void;
  onRegenerate: () => void;
  isLoading: boolean;
  canRegenerate: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onGenerate, onRegenerate, isLoading, canRegenerate }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false); 

  const handleGenerate = () => {
    if (inputValue.trim()) {
      onGenerate(inputValue.trim());
    }
  };

  const handleRegenerate = () => {
    setIsRegenerating(true); 
    onRegenerate(); 
  };

  return (
    <aside className="sidebar">
      <div className="form-group">
        <h2>Create Flowchart</h2>
        <label htmlFor="rawContent">Raw content</label>
        <textarea
          id="rawContent"
          placeholder="Add your raw content here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          maxLength={5000}
          style={{ marginBottom: "1rem", width: "93%", height: '100px' }}
        />
        <div style={{display:'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'}}>
        
        <div className="char-count">{inputValue.length}/5000 characters (min 50 characters)</div>
        {canRegenerate && (
          <button 
            className="iconButton" 
            onClick={handleRegenerate} 
            disabled={isLoading}
          >
            <FaRedo size={15} />
          </button>
        )}
        </div>

        <button 
          className="sideBarButton" 
          onClick={handleGenerate}
          disabled={isLoading}
          style={{ width: "100%" }}
        >
          {isLoading ? (isRegenerating ? "Regenerating..." : "Generating...") : "Generate"}
        </button>
        
      </div>
    </aside>
  );
};

export default Sidebar;
