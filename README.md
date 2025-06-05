# Next.js CRUD with Image Upload

This example provides a simple CRUD API using Next.js API routes with file upload support via `multer`. It stores posts in memory and saves uploaded images under `public/uploads`.

## Getting Started

1. Install dependencies (requires Node.js):

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

Uploaded files will appear in the `public/uploads` folder and be served at `/uploads/<filename>`.

## Project Structure

- `pages/index.js` – main page with a form to create posts and list them.
- `pages/api/posts` – API routes implementing CRUD logic with image upload.
- `lib/data.js` – simple in-memory storage for posts during runtime.

This is a minimal demonstration and is **not** intended for production use.
