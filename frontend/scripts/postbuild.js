import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

if (fs.existsSync(distDir)) {
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
  console.log('✓ Successfully generated 404.html and .nojekyll for GitHub Pages');
}
