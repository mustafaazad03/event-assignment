# Event Application

Welcome to the Event Application! This project is designed to help you manage and display events in a modern web application. Whether you're a newcomer or an experienced developer, this README will guide you through the project structure, setup instructions, and key concepts.

## Project Overview

The Event Application is built with:
- **Next.js** for server and client-side rendering.
- **React** and **TypeScript** for building robust, scalable user interfaces.
- **Tailwind CSS** for rapid, utility-first styling.
- A custom event storage solution that uses browser local storage to persist event data.

The application allows you to:
- Create new events.
- View event details.
- Organize events by community.
- Enjoy a modern UI built with pre-defined components like Cards, Forms, and Tabs.

## Key Features

- **Event Form:** Create and edit events with image processing integration.
- **Event List & Detail:** Browse through events and view detailed descriptions.
- **Local Storage Integration:** Events are stored locally, making it easy to prototype and test without a backend.
- **Component Library:** Reusable UI components (Card, Button, Input, Tabs, etc.) streamline the development process.

## Project Structure

Below is a high-level overview of the project structure:

- **/src/components:** Contains reusable UI components such as event forms, event lists, cards, and tabs.
- **/src/lib:** Includes helper libraries for image processing and event storage.
- **/src/types:** TypeScript interfaces to ensure type safety across the project.
- **/src/app:** Main application pages and routing for events.
- **README.md:** This file – an overview and guide to get you started.

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)
- npm or yarn

### Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/mustafaazad03/event-application.git
  cd event-application
  ```

2. Install dependencies:
  ```bash
  npm install
  # Or with yarn:
  yarn install
  ```

3. Run the development server:
  ```bash
  npm run dev
  # Or with yarn:
  yarn dev
  ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.