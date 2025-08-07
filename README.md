1. Guitar Shop – Web Application
Guitar Shop is a responsive and interactive web application built using React, GraphQL, and CSS. It enables users to browse a collection of guitar models, view detailed specifications, and discover which musicians play each instrument. All data is fetched from a GraphQL API.

2. Technologies Used
-React – For building dynamic, component-based user interfaces.

-GraphQL – For efficient and structured data querying.

-CSS – Custom styles written without any frameworks (e.g., no Tailwind or Bootstrap).

3.Features
-Guitar listing fetched dynamically from the backend

-Detailed guitar model pages with description, specs, and images

-Musician showcase section per model

-Tab-based navigation between specifications and musician info

-Pagination for musician cards

-Fully responsive layout with clean, handcrafted CSS



**Setup Instructions

1.Clone the Repository

git clone https://github.com/lsim96/Project.git
cd Project

2.Install Dependencies

Make sure Node.js and npm are installed. Then run:
npm install

3.Start the Development Server
npm run dev
-The application should be running on http://localhost:5173 or http://localhost:3000.

4.GraphQL Backend
-Ensure your GraphQL backend is running and matches the endpoint configured in your Apollo Client setup

**Project Structure
src/
├── Components/          # Reusable components like MusiciansCard
├── Layout/              # Layout components such as Header
├── Pages/               # Page components like DetailsPage
├── queries/             # GraphQL queries
├── styles/              # Plain CSS files
├── App.tsx
└── main.tsx or index.tsx





