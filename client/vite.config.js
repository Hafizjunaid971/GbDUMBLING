// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ No need to import tailwindcss as a plugin here
// Tailwind works via `postcss.config.js` and `tailwind.config.js`

export default defineConfig({
  plugins: [react()],
  base: "./", // ✅ VERY IMPORTANT for Vercel to avoid blank page
});
