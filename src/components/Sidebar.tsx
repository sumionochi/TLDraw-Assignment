import React, { useState } from "react";
import "../index.css"; 

interface SidebarProps {
  onGenerate: (count: number) => void;
  itemCount: number; 
}

const Sidebar: React.FC<SidebarProps> = ({ onGenerate, itemCount }) => {
  const [inputValue, setInputValue] = useState<number>(itemCount);

  return (
    <aside className="sidebar">
      <div>
        <p>Timeline</p>
        <input
          type="number"
          placeholder="Enter number of items"
          value={inputValue}
          min={0}
          onChange={(e) => setInputValue(Math.max(0, Number(e.target.value)))}
          style={{ marginBottom: "0.8rem", padding: "10px", borderRadius: '5px'}}
        />
        <button className="sideBarButton" style={{ width: '100%' }} onClick={() => onGenerate(inputValue)}>
          Generate
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;






