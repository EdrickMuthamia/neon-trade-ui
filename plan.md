# DTTool Branding Integration Plan

This plan outlines the steps to integrate the provided logos into the DTTool fintech application.

## Goals
1. Integrate the primary branding logo (IMG-20260403-WA0026.jpg).
2. Integrate the secondary neon market-themed logo (IMG-20260403-WA0025.jpg).
3. Ensure the logos are placed strategically in the UI (Header, Dashboard, and Loading states).
4. Maintain the dark theme with neon accents as per the original project vision.

## Tasks
1. **Logo Placement**:
   - Primary Logo (IMG-20260403-WA0026.jpg - "TRADER" with Bull/Bear): 
     - Use in the Sidebar/Header as the main brand identity.
     - Use in the Login/Auth screen as the hero image.
   - Secondary Logo (IMG-20260403-WA0025.jpg - Neon Candlesticks):
     - Use in the Dashboard header or as a decorative element in the "Market Overview" section.
     - Use as a loading spinner placeholder or small icon in the navigation.

2. **File Updates**:
   - `src/App.tsx`: Update the sidebar/header section to include the primary logo.
   - `src/components/auth/Auth.tsx`: Add the primary logo to the authentication forms.
   - Create a `src/components/common/Logo.tsx` component for reusable branding.

3. **Styling**:
   - Use Tailwind CSS for responsive sizing and positioning.
   - Ensure the logos blend well with the existing black background and neon green/red color palette.

4. **Assets**:
   - Use the provided public URLs for the images:
     - Primary: https://storage.googleapis.com/dala-prod-public-storage/attachments/ba8890c2-fbd6-4a2f-8641-274d87d32c48/1775692109887_IMG-20260403-WA0026.jpg
     - Secondary: https://storage.googleapis.com/dala-prod-public-storage/attachments/ba8890c2-fbd6-4a2f-8641-274d87d32c48/1775692109888_IMG-20260403-WA0025.jpg
