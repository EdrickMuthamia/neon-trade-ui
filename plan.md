## DTTool Fintech Application Plan

This document outlines the plan for building the DTTool production-ready fintech web application.

**1. Project Setup & Initial Structure:**
    *   Create a `plan.md` file outlining the project structure and features.
    *   Define the main folder structure: `dttool-platform/client/`, `dttool-platform/server/`.
    *   Set up a Node.js backend with Express.

**2. Backend Development (Node.js - Express):**
    *   Implement JWT authentication for user security.
    *   Set up secure environment variables for API keys and database credentials.
    *   Define database models for `users`, `trades`, `botSettings`, and `transactions`.
    *   Create API endpoints for:
        *   User authentication (signup, login).
        *   Dashboard data (balance, P/L, trade history).
        *   Manual trading (`POST /trade`).
        *   Bot trading management (start/stop, strategy selection).
        *   Settings configuration.
    *   Develop the bot trading engine:
        *   Implement interval-based fetching of market data from Binance (public API).
        *   Implement Moving Average crossover and RSI-based strategies.
        *   Integrate risk level selection.
        *   Store bot-executed trades.
    *   Create a service layer (`services/exchangeService.js`) for exchange API integrations, initially simulating calls.

**3. Frontend Development (React - Vite):**
    *   Set up the frontend with Vite and Tailwind CSS.
    *   Implement a dark theme with neon green and red accents.
    *   Build UI components for:
        *   Authentication pages (Login, Signup).
        *   User Dashboard (balance, P/L, trade history).
        *   Manual Trading Module (asset selection, buy/sell forms, stop loss/take profit inputs).
        *   Bot Trading Module (toggle, strategy selection, risk level).
        *   Settings Page.
    *   Integrate a TradingView chart widget for market data visualization.
    *   Implement state management (Context API or Zustand).
    *   Ensure a responsive and clean fintech UI.

**4. Database Integration:**
    *   Choose between Firebase or MongoDB for database persistence. (The Supabase Engineer will be consulted if database migration or edge functions are required).

**5. Security:**
    *   Implement input validation on all API endpoints.
    *   Structure for future encryption of API keys.
    *   Ensure HTTPS-ready configuration.

**6. Testing & Refinement:**
    *   Initially simulate all trading actions.
    *   Structure code for seamless integration with real exchange APIs.
    *   Thoroughly test all features and ensure a smooth user experience.

**Agent Assignments:**
*   **Frontend Engineer:** Will handle all UI components, user interfaces, and visual elements. This includes setting up the React frontend, Tailwind CSS, and integrating TradingView charts.
*   **Backend Engineer:** Will handle the Node.js backend, API development, JWT authentication, bot trading logic, and database interactions (excluding migrations and edge functions, which would be Supabase Engineer's role if applicable).
*   **Supabase Engineer:** Will be consulted *only if* database migrations or edge functions become necessary. For this initial plan, direct Supabase involvement is not assumed.

**Next Steps:**
The Frontend Engineer will be tasked with generating images and then proceeding with the UI implementation based on this plan. The Backend Engineer will set up the server structure and API foundations.
        
        