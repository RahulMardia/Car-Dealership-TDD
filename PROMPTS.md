# AI Tooling Chat History & Prompts

Below is a summary of the prompts and interactions used to build this project with the AI assistant.

### 1. Project Initialization & Auth
**Prompt:** "Create a React frontend and Express backend for a car dealership. Include user auth and admin auth. I want the backend to use MongoDB."
- *Action:* The AI initialized the Vite frontend and Express backend, setting up `User` models and JWT authentication middleware for both regular users and admins.

### 2. Redux Thunk & API Setup
**Prompt:** "Give for normal login again with comment as me. Use Redux Thunks. After login the landing page should not allow the user to go back to login and register page without logout."
- *Action:* The AI structured the `authActions.ts` and `vehicleActions.ts` files, configuring `@reduxjs/toolkit` and implementing API interceptors.

### 3. Test-Driven Development (TDD) Environment
**Prompt:** "The signature of 'configureMockStore' is deprecated. But if it is deprecated should we not use something else? Easy and latest method give me that."
- *Action:* The AI replaced the deprecated `redux-mock-store` with modern RTK integration testing using a real store configuration inside Vitest environments, successfully building out 9 individual `.test.ts` files.

### 4. Admin Dashboard Architecture
**Prompt:** "In the admin dashboard vehicle cards should be shown with view details option and inside it we should be able to update delete Restock vehicle UI. Also when i click on add vehicle it should give a input form to take detail from me make, model, category, price, and quantity in stock."
- *Action:* The AI drafted an Implementation Plan for the CRUD features.

### 5. Advanced UI & Styling (Glassmorphism)
**Prompt:** "Give the sleek and clean asthetic UI"
- *Action:* The AI provided the `AdminDashboard.tsx`, `AdminVehicleCard.tsx`, and `EditVehicle.tsx` using an incredibly premium glassmorphism dark mode theme, featuring absolute positioned overlays and animated transitions.

### 6. Refinements and Bug Fixing
**Prompt:** "in the dashboard add vehicle the quantity has arrow up and down which should not be there"
- *Action:* The AI provided the exact Tailwind utility classes `[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none` to override browser defaults.

**Prompt:** "Category dropdown has different color background then the page ui make sure the color is same"
- *Action:* The AI rebuilt the `<select>` tag into a beautiful, custom mapped list, and eventually converted it into a bespoke scrollable React component (`CategorySelect.tsx`).

