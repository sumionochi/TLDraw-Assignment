import { Tldraw, createShapeId, Editor } from "tldraw";
import "tldraw/tldraw.css";
import { useEffect, useRef } from "react";

interface TldrawComponentProps {
  count: number;
}


export default function TldrawComponent({ count }: TldrawComponentProps) {
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {

    if (editorRef.current) {
      console.log("Items to generate:", count);

      const helloWorldShapeId = createShapeId();
      editorRef.current.createShape({
        id: helloWorldShapeId,
        type: "text",
        x: 200,
        y: 200,
        props: {
          text: `Generated ${count} items`,
        },
      });

      return () => {
        editorRef.current?.deleteShape(helloWorldShapeId);
      };
    }
    
  }, [count]);

  return (
    <div style={{ position: "fixed", width: "100%", height: "100%" }}>
      <Tldraw
        hideUi={true}
        onMount={(editor) => {
          editorRef.current = editor;
          console.log("Initial items to generate:", count);

          const helloWorldShapeId = createShapeId();

          return () => {
            editor.deleteShape(helloWorldShapeId);
          };
        }}
      />
    </div>
  );
}