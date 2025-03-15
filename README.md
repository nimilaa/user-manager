# User Manager

This repo provides a starting reference to get the User Manager implementation. This implementation works on React in Vite with HMR and some ESLint rules.

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Running the Project

- This needs `user-server` project to get data
- Switch to the branch you need to build in user-server repo
- To install  `npm i` or `npm install`
- `npx json-server db.json`
- You can access user data with [localhost:3000/users](localhost:3000/users)
- The switch to the branch you need to build in user-manager repo
- To install  `npm i` or `npm install`
- `npm run dev`
- Navigate to [localhost:4000/](localhost:4000/)

## Folder Structure
- `config` - defines the environment variables
- `src` - holds the React source files, most development will take place here
- `src/app` - this folder holds redux store files
- `src/components` - holds common components shared across multiple pages
- `src/components/chart` - holds all the chart components
- `src/config` - core configs 
- `src/utils` - common utils used across the app
- `src/main.tsx` - entry point of the app
- `tailwind.config.js` - holds tailwind specific style definitions

## Used Libraries
- `react` - App implementation
- `redux` - State management
- `tailwind` - CSS and responsive design
- `heroUI` - UI Components
- `ag-grid` - Table components with virtualization
- `highcharts` - Chart components