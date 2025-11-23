import { copyFileSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const distDir = join(rootDir, 'dist');

// Copy .htaccess to dist if it exists
const htaccessPath = join(publicDir, '.htaccess');
const distHtaccessPath = join(distDir, '.htaccess');

try {
  if (existsSync(htaccessPath)) {
    copyFileSync(htaccessPath, distHtaccessPath);
    console.log('✓ Copied .htaccess to dist/');
  } else {
    console.log('⚠ .htaccess not found in public/, skipping...');
  }
} catch (error) {
  console.error('Error copying .htaccess:', error.message);
}

// Create _headers file for Render/Netlify static sites
const headersContent = `/*.js
  Content-Type: application/javascript; charset=utf-8

/*.mjs
  Content-Type: application/javascript; charset=utf-8

/*.css
  Content-Type: text/css; charset=utf-8

/*.json
  Content-Type: application/json; charset=utf-8

/*.svg
  Content-Type: image/svg+xml

/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
`;

try {
  const headersPath = join(distDir, '_headers');
  writeFileSync(headersPath, headersContent);
  console.log('✓ Created _headers file in dist/');
} catch (error) {
  console.error('Error creating _headers:', error.message);
}

