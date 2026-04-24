Product List with Cart - Frontend Mentor Challenge
This is my solution to the Product list with cart challenge on Frontend Mentor. The goal was to build a functional dessert ordering application that is fully responsive and manages cart state in real-time.
🚀 Demo
Live Site URL: [product-list-with-cart-main-omega-two.vercel.app]
Frontend Mentor Solution: [Paste your solution link here]

🛠️ Tech Stack
For this project, I chose a modern stack focused on development speed and type safety:
React 18 (Vite as the build tool)
TypeScript for strict typing to prevent bugs in the cart logic.
CSS3 with custom variables for styling (Grid and Flexbox).
Vercel for continuous deployment (CI/CD).

🌟 Features
Dynamic Product List: All dessert data is rendered dynamically from a JSON file, including images, categories, and prices.

Real-time Cart Management:

Add/remove items with a single click.

Increment/decrement quantities directly from the product card.

Automatic calculation of item subtotals and overall order total.

Responsive Grid: The layout adapts seamlessly from mobile (1 column) to tablet (2 columns) and desktop (3 columns) using CSS Grid.

Order Confirmation Modal: A polished summary appears upon clicking "Confirm Order," showing a full breakdown of the purchase.

State Reset: "Start New Order" functionality clears the cart and resets the UI for a fresh start.

Interactive UI Elements: Hover states for buttons, active borders for selected products, and a "Carbon Neutral" delivery badge for enhanced UX.


🧠 Technical Challenges & Learnings

1. Complex State Management

The biggest challenge was synchronizing the cart state. The app needs to add products and allow users to increment or decrement quantities from both the product card and the cart summary simultaneously.

Solution: I implemented a state object where keys are product names and values are quantities, allowing for $O(1)$ constant-time lookups and efficient updates.

2. Production Asset Paths (Vite + Vercel)During deployment, images failed to load due to incorrect relative paths.

Learning: 

I learned the crucial difference between the src/assets and public/ directories in Vite. I moved all assets to the public folder and used absolute paths (/assets/...) to ensure the browser finds them regardless of the URL nesting in production.

3. Git Configuration & Repository Cleanup

Initially, heavy node_modules files were accidentally tracked, causing push errors (HTTP 500).Solution: I reconfigured the .gitignore file and used git rm -r --cached . to clear the Git index without deleting my local files, resulting in a lightweight and professional repository.
📖 How to Run Locally
Clone the repository:
Bash
git clone https://github.com/your-username/your-repo.git
Install dependencies:
Bashnpm install
Start the development server:Bashnpm run dev
