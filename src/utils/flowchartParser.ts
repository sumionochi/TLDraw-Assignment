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

  let y = 100; 
  const x = 100; 
  const componentSpacing = 220; 
  const textOffsetX = 250; 
  const lineHeight = 160; 
  let componentCount = 0;
  let components: FlowchartElement[] = []; 
  let texts: FlowchartElement[] = []; 

  lines.forEach((line, index) => {
    if (line.includes('**Component Type**:')) {
      if (components.length > 0) {
        componentCount++;
        y += componentSpacing; 
      }
      components.push({
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
      });
    } else if (line.includes('**Text**:')) {
      const text = line.split('**Text**:')[1].trim();
      const [title, description] = text.split(':').map(part => part.trim());

      if (components.length > 0) {
        components[components.length - 1].props.text = title; 
        texts.push({
          type: 'text',
          x: x + textOffsetX, 
          y: y + 10, 
          props: {
            text: description,
            size: 'm',
            font: 'draw',
          }
        });
      }
    }
  });

  // Filtering out any undefined or incomplete components
  components = components.filter(component => component.props && component.props.text);
  texts = texts.filter(text => text.props && text.props.text);

  if (components.length > 0) {
    componentCount++;
  }

  // Explicitly added n-1 lines
  for (let i = 1; i < componentCount; i++) {
    elements.push({
      type: 'geo',
      x: x + 100,
      y: 100 + (i - 1) * componentSpacing + 60,
      props: {
        geo: 'rectangle',
        w: 2, 
        h: lineHeight, 
        fill: 'solid',
        color: 'black',
      },
    });
  }

  elements.push(...components);
  elements.push(...texts);

  return elements;
}
