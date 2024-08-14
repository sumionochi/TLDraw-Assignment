import React, { useState } from "react";
import "../index.css"; 

interface SidebarProps {
  onGenerate: (count: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onGenerate }) => {
  const [itemCount, setItemCount] = useState<number>(0);

  return (
    <aside className="sidebar">
      <div className="">
        <p>Timeline</p>
        <input
          type="number"
          placeholder="Enter number of items"
          value={itemCount}
          min={0}
          onChange={(e) => setItemCount(Number(e.target.value))}
          style={{ marginBottom: "0.8rem", padding: "10px", borderRadius: '5px'}}
        />
        <button className="sideBarButton" style={{width:'100%'}} onClick={() => onGenerate(itemCount)}>Generate</button>
      </div>
    </aside>
  );
};

export default Sidebar;






