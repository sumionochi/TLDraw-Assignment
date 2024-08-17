export interface FlowchartElement {
  type: 'geo' | 'text';
  x: number;
  y: number;
  props: {
    [key: string]: any;
  };
}

export function parseContextToFlowchartElements(context: string): FlowchartElement[] {
  const elements: FlowchartElement[] = [];
  const lines = context.split('\n').map(line => line.trim()).filter(line => line !== '');

  let y = 100; // Initial y-coordinate
  const x = 100; // x-coordinate for all elements
  const componentSpacing = 220; // Vertical space between components
  const textOffsetX = 250; // Offset for text labels along the x-axis
  const lineHeight = 160; // Height of the connecting lines
  let currentComponent: Partial<FlowchartElement> = {};
  let componentCount = 0;

  lines.forEach((line, index) => {
    if (line.includes('**Component Type**:')) {
      if (Object.keys(currentComponent).length > 0) {
        elements.push(currentComponent as FlowchartElement);
        componentCount++;
        y += componentSpacing; // Add spacing after each component
      }
      currentComponent = {
        type: 'geo',
        x: x,
        y: y,
        props: {
          geo: 'rectangle',
          w: 200,
          h: 60,
          fill: 'solid',
          color: 'black',
        }
      };
    } else if (line.includes('**Text**:')) {
      const text = line.split('**Text**:')[1].trim();
      currentComponent.props = {
        ...currentComponent.props,
        text: text
      };
      elements.push({
        type: 'text',
        x: x + textOffsetX, // Offset text to the right of the rectangle
        y: y + 10, // Slightly lower to center vertically
        props: {
          text: text,
          size: 'm',
          font: 'draw',
        }
      });
    }
  });

  if (Object.keys(currentComponent).length > 0) {
    elements.push(currentComponent as FlowchartElement);
    componentCount++;
  }

  // Explicitly add n-1 lines
  for (let i = 1; i < componentCount; i++) {
    elements.push({
      type: 'geo',
      x: x + 100,
      y: 100 + (i - 1) * componentSpacing + 60,
      props: {
        geo: 'rectangle',
        w: 2, // Thin width for vertical line
        h: lineHeight, // Height of the line for better visibility
        fill: 'solid',
        color: 'black',
      },
    });
  }

  return elements;
}
