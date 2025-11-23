import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist directory
app.use(express.static(join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    // Set correct MIME types
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (path.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (path.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    } else if (path.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    }
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}));

// SPA routing - serve index.html for all routes that don't match static files
// Use app.use() instead of app.get() for Express 5.x compatibility
app.use((req, res, next) => {
  // If the request is for a static file, skip this middleware
  if (req.path.startsWith('/assets/') || req.path.includes('.')) {
    return next();
  }
  
  // Serve index.html for all other routes
  try {
    const indexHtml = readFileSync(join(__dirname, 'dist', 'index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(indexHtml);
  } catch (error) {
    res.status(500).send('Error loading index.html');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

