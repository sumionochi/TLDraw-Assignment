import { Tldraw, createShapeId, Editor, TLShapeId } from "tldraw";
import "tldraw/tldraw.css";
import { useEffect, useRef, useState } from "react";

interface TldrawComponentProps {
  count: number;
}

export default function TldrawComponent({ count }: TldrawComponentProps) {
  const editorRef = useRef<Editor | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      console.log("Items to generate:", count);

      const allShapeIds: TLShapeId[] = Array.from(editorRef.current.getCurrentPageShapeIds());
      editorRef.current.deleteShapes(allShapeIds);

      const helloWorldShapeId = createShapeId();
      editorRef.current.createShape({
        id: helloWorldShapeId,
        type: "text",
        x: 50,
        y: 150,
        props: {
          text: `Generated ${count} items in Timeline`,
        },
      });

      const baseX = 100;
      const baseY = 400;
      const spacing = 250;
      const lineWidth = Math.max(0, (count - 1) * spacing);
      const lineHeight = 50;

      // timeline line
      if (count > 1) {
        const lineShapeId = createShapeId();
        editorRef.current.createShapes([
          {
            id: lineShapeId,
            type: "geo",
            x: baseX,
            y: baseY + 50,
            props: {
              geo: "rectangle",
              w: lineWidth,
              h: 2, 
              fill: "solid",
            },
          },
        ]);
      }

      // timeline items
      for (let i = 0; i < count; i++) {
        const circleShapeId = createShapeId();
        editorRef.current.createShapes([
          {
            id: circleShapeId,
            type: "geo",
            x: baseX + i * spacing - 5,
            y: baseY + 45,
            props: {
              geo: "oval",
              w: 10,
              h: 10,
              fill: "solid",
            },
          },
        ]);
      }

      // description items
      for (let i = 0; i < count; i++) {
        const isOdd = i % 2 !== 0;

        const subheadingY = isOdd ? baseY - 120 : baseY + 200;
        const descriptionY = isOdd ? baseY - 80 : baseY + 150;
        const yOffset = isOdd ? -10 : 60;

        const lineShapeId = createShapeId();
        editorRef.current.createShapes([
          {
            id: lineShapeId,
            type: "geo",
            x: baseX + i * spacing,
            y: baseY + yOffset,
            props: {
              geo: "rectangle",
              w: 2,
              h: lineHeight, 
              fill: "solid",
            },
          },
        ]);

        const subheadingShapeId = createShapeId();
        editorRef.current.createShapes([
          {
            id: subheadingShapeId,
            type: "text",
            x: baseX + i * spacing - 70,
            y: subheadingY,
            props: {
              text: `Subheading ${i + 1}`
            },
          },
        ]);

        const descriptionShapeId = createShapeId();
        editorRef.current.createShapes([
          {
            id: descriptionShapeId,
            type: "text",
            x: baseX + i * spacing - 70,
            y: descriptionY,
            props: {
              text: `Description ${i + 1}`
            },
          },
        ]);
      }
    }
  }, [count, editor]);

  return (
    <div style={{ position: "fixed", width: '100vw', height: "95vh" }}>
      <Tldraw
        hideUi={false}
        onMount={(editor) => {
          editorRef.current = editor;
          setEditor(editor);
          console.log("Initial items to generate:", count);

          // Initial placeholder or setup
          const helloWorldShapeId = createShapeId();

          editor.createShape({
            id: helloWorldShapeId,
            type: "text",
            x: 200,
            y: 200,
            props: {
              text: `Generated ${count} items in Timeline`,
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
