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
          content: `You are a helpful assistant that generates highly detailed flowchart descriptions for rendering with Tldraw. The flowchart should represent a system with various components like services, databases, user interfaces, and their connections. Each component should include comprehensive and specific details. The description should be structured with each component or connection on a new line. Each line should include:
          1. **Component Type**: Describe the type of component (e.g., "rectangle", "text", "thin-rectangle" for connection lines). 
          2. **Text**: Include a highly detailed label or title for the component, with relevant information about its role, function, or contents.
          3. **Connections**: Specify if this component should be connected to another component, including the direction of the connection (e.g., "down", "right"). 
          4. **Order**: Describe the order in which components appear in the flowchart. 
          For connections between components, use "thin-rectangle" as the component type and specify the connection direction.
          Make sure the descriptions for each component are very detailed and include any relevant information that clarifies the component's purpose or functionality in the system.` 
        },
        { 
          role: 'user', 
          content: `${prompt}\nGenerate a flowchart description based on the following context, ensuring that each component's text is detailed and comprehensive:` 
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
