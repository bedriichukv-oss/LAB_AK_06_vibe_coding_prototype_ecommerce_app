# Vibe Coding Prototype App – Product Requirements Document (PRD)

## 1. App Overview / Purpose
A client-side web app for online shoppers to browse, select, and order fruit products. The app demonstrates basic e-commerce functionality with a dynamic, visually appealing interface.

## 2. Target Audience
- Online shoppers interested in ordering fruit products.
- Users accessing the app from desktop or mobile devices.

## 3. Core Features & Pages

### Products Page
- Displays a list of 10 fruit products (name, price per unit, emoji image).
- Allows users to select quantity and add items to the shopping cart.

### ProductDetails Page
- Shows detailed info for a selected product (name, description, price, emoji).
- Includes navigation back to the Products page.

### ShoppingCart Page
- Lists products added to the cart (name, quantity, total price).
- Allows updating quantity and removing items.

### Checkout Page
- Summarizes products being purchased (name, quantity, price).
- Displays total price and a “Process Order” button.

## 4. Navigation Flow
- Left-side navigation menu for switching between Products, ProductDetails, ShoppingCart, and Checkout pages.
- Menu collapses to 1–2 letter abbreviations when display width < 300px.

## 5. Sample Dataset
- 10 fruit products, each with:
  - Name
  - Description
  - Price per unit (e.g., per item, ounce, or pound)
  - Emoji image

## 6. Technical Requirements
- Technologies: HTML, CSS, JavaScript (client-side only)
- No backend, authentication, payment, or database integration
- Static prototype

## 7. Styling Guidelines
- Visually appealing, basic styling
- Dynamic UI that scales for desktop and phone screens
- Navigation bar collapses on small screens
- Not fully responsive or polished

## 8. Use Cases / User Stories
- User browses products and views details.
- User adds products to the cart.
- User updates quantities or removes items in the cart.
- User reviews order and “processes” it at checkout.

## 9. Out of Scope
- User authentication
- Payment processing
- Persistent storage or database
- Backend integration

## 10. Acceptance Criteria
- All pages accessible via navigation menu.
- Product list and details display correctly.
- Cart functionality (add, update, remove) works.
- Checkout summary and total price are accurate.
- Navigation bar collapses as specified.
