import { Tldraw, createShapeId } from "tldraw";
import "tldraw/tldraw.css";
import {useState } from "react";

export default function TldrawComponent() {
  const [itemCount, setItemCount] = useState(0);

  const handleGenerate = (count : number) => {
    console.log(count);
  }

  return (
    <div style={{ position: "fixed", width: "50vh", height: "50vh" }}>
       <h2>Timeline</h2>
      <input
        type="number"
        placeholder="Enter number of items"
        onChange={(e) => setItemCount(Number(e.target.value))}
        style={{ marginBottom: "20px", padding: "10px", width: "200px" }}
      />
      <button onClick={() => handleGenerate(itemCount)}>Generate</button>
      <Tldraw
        hideUi={true}
        onMount={(editor) => {
          const helloWorldShapeId = createShapeId();
          editor.createShape({
            id: helloWorldShapeId,
            type: "text",
            x: 200,
            y: 200,
            props: {
              text: "Hello world!",
            },
          });

          return () => {
            editor.deleteShape(helloWorldShapeId);
          };
        }}
      />
    </div>
  );
}