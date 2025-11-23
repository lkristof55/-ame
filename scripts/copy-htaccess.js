import { copyFileSync, existsSync } from 'fs';
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

