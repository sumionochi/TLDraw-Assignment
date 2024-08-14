# Alai Coding Challenge: TLDraw Timeline Implementation

This project is a web application that allows users to create a timeline using a custom `TldrawComponent`. The application features a responsive navbar and a sidebar that can be toggled on and off. It is built using React, Tldraw, and modern CSS.

![Screenshot 2024-08-14 103426](https://github.com/user-attachments/assets/da35d6ec-58d3-4c43-a84a-beb7aa335869)
![Screenshot 2024-08-14 103520](https://github.com/user-attachments/assets/2ca20b66-8397-4fd7-bfa1-1c7cc7c2dfb4)
![Screenshot 2024-08-14 103513](https://github.com/user-attachments/assets/13dc2bed-64bd-478b-bda1-889442bfc581)

## Challenge Overview

Your task is to create a timeline component using TLDraw, similar to the one found on https://getalai.com/. You will also need to implement a user input feature to dynamically generate timeline elements.

## Tasks

1. Create a timeline element using TLDraw similar to what you can see on https://getalai.com/
   ![Timeline Example](./src/assets/timeline.png)

2. Add an input field where the user can enter desired number of items and a generate button. When the user clicks generate,
   then the timeline element should show that many number of elements.

## Features

### 1. Timeline Generation
- **Tldraw Component**: A dynamic timeline component that can generate a timeline based on the number of items specified by the user.
- **Alternating Subheadings and Descriptions**: The timeline supports alternating positions for subheadings and descriptions. Odd-numbered items are displayed above the timeline, and even-numbered items are displayed below the timeline.

### 2. Responsive Navbar
- **Logo**: Displays the company or app logo.
- **Dynamic Text**: The "Create Timeline Slide" text is shown on larger screens but hidden on smaller screens.
- **Export Button**: The "Export to Google Slides" button is visible on larger screens and hidden on smaller screens.
- **Hamburger Menu**: On smaller screens, a hamburger menu icon replaces the text, allowing users to toggle the visibility of the sidebar.

### 3. Sidebar Functionality
- **Item Input**: Allows users to input the number of timeline items they want to generate.
- **Generate Button**: A button that triggers the timeline generation based on the input value.
- **Toggle Visibility**: The sidebar can be shown or hidden using a button in the navbar.

## Usage

### Getting Started

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/timeline-app.git
    cd timeline-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    npm start
    ```

4. **Open in browser**:
    Navigate to `http://localhost:3000` to view the application.

### Directory Structure

- `src/`: Contains all the source code for the application.
  - `components/`: Contains reusable components like `Navbar`, `Sidebar`, and `TldrawComponent`.
  - `index.css`: Contains global and component-specific CSS styles.

### Components

#### 1. `TldrawComponent`

- **Props**:
  - `count`: The number of items to generate on the timeline.

- **Features**:
  - Creates a timeline based on the `count`.
  - Alternates the position of subheadings and descriptions for odd and even items.

#### 2. `Navbar`

- **Props**:
  - `toggleSidebar`: Function to toggle the sidebar's visibility.

- **Features**:
  - Responsive design that hides the text and button on smaller screens.
  - Displays a hamburger menu on smaller screens to control the sidebar.

#### 3. `Sidebar`

- **Props**:
  - `onGenerate`: Function to generate the timeline based on the input value.
  - `itemCount`: The current count of items to be generated.

- **Features**:
  - Input field for the user to specify the number of timeline items.
  - Button to trigger the generation of the timeline.
  - Visibility can be toggled by the Navbar button.

### CSS

The application uses modern CSS for styling, including media queries for responsiveness.

- **Responsive Design**: The layout adjusts for different screen sizes, hiding and showing elements as needed.


- **Custom Styles**: The `index.css` file includes custom styles for the Navbar, Sidebar, and TldrawComponent.



## Submission

Please create a private repo for your submission to avoid leaking the solution. Add our emails (krishna@getalai.com and anmol@getalai.com) when you're ready for review.
Include a brief description of your approach and any challenges you faced.

## Resources

- [TLDraw Documentation](https://tldraw.dev/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
