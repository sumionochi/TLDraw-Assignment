import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('VITE_OPENAI_API_KEY is not set in environment variables');
}

const client = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export async function generateContext(prompt: string): Promise<string> {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        { 
          role: 'system', 
          content: `You are a helpful assistant that generates highly detailed flowchart descriptions for rendering with Tldraw. The flowchart should represent a system with various components like services, databases, user interfaces, and their connections. 

          Each component should include comprehensive and specific details, leaving nothing undefined or blank. Every required element must be provided and clearly articulated. The description should be structured with each component or connection on a new line. Each line must include:
          1. **Component Type**: Clearly describe the type of component (e.g., "rectangle", "text", "thin-rectangle" for connection lines). Ensure that every component type is fully defined.
          2. **Text**: Provide a highly detailed label or title for the component, with relevant information about its role, function, or contents. Use the format "Title: Description". Make sure the title and description are complete and make sense.
          3. **Connections**: Specify if this component should be connected to another component, including the direction of the connection (e.g., "down", "right"). Ensure that connections are logical and clearly described.
          4. **Order**: Describe the exact order in which components appear in the flowchart. Ensure that this order is sequential and logical.

          Make sure each component follows this exact format strictly and leave nothing undefined or incomplete:
          - **Component Type**: rectangle
          - **Text**: Title: Detailed description.
          - **Connections**: down
          - **Order**: (Sequential number).` 
        },
        { 
          role: 'user', 
          content: `${prompt}\nGenerate a flowchart description based on the following context, ensuring that each component's text is detailed, comprehensive, and nothing is left undefined or blank:` 
        }
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 300,
    });

    const generatedContent = chatCompletion.choices[0]?.message?.content;
    
    if (!generatedContent) {
      throw new Error('No content generated from OpenAI');
    }

    return generatedContent.trim();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}
