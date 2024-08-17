import React, { useEffect, useRef, useState } from "react";
import { Tldraw, createShapeId, Editor, TLShapeId } from "tldraw";
import "tldraw/tldraw.css";
import { parseContextToFlowchartElements, FlowchartElement } from "./utils/flowchartParser";

interface TldrawComponentProps {
  context: string;
}

export default function TldrawComponent({ context }: TldrawComponentProps) {
  const editorRef = useRef<Editor | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    if (editor && context) {
      const elements: FlowchartElement[] = parseContextToFlowchartElements(context);
      console.log("Parsed Elements:", elements);

      const allShapeIds = Array.from(editor.getCurrentPageShapeIds());
      editor.deleteShapes(allShapeIds);

      elements.forEach(element => {
        const shapeId = createShapeId();
        const validSize = ["s", "m", "l", "xl", "xxl"].includes(element.props.size as string) ? element.props.size : "m";

        if (element.type === 'geo' && element.props.geo === 'line') {
          console.log("Creating line shape:", element);
          editor.createShapes([
            {
              id: shapeId,
              type: 'line',
              x: element.x,
              y: element.y,
              props: {
                ...element.props,
              },
            }
          ]);
        } else {
          console.log("Creating geo or text shape:", element);
          editor.createShapes([
            {
              id: shapeId,
              type: element.type,
              x: element.x,
              y: element.y,
              props: {
                ...element.props,
                size: validSize,
              },
            }
          ]);
        }
      });
    }
  }, [context, editor]);

  return (
    <div style={{ position: "fixed", width: '100vw', height: "95vh" }}>
      <Tldraw
        hideUi={false}
        onMount={(editor) => {
          editorRef.current = editor;
          setEditor(editor);
        }}
      />
    </div>
  );
}
