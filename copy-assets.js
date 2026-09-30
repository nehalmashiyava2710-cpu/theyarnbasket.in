import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'Website');
const targetDir = path.join(__dirname, 'public', 'products');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir);
  console.log(`Found ${files.length} files in Website directory.`);

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const safeName = file
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, '-')
      .replace(/^-|-$/g, '');
    
    const targetPath = path.join(targetDir, safeName);
    fs.copyFileSync(sourcePath, targetPath);
  });
}

const logoSource = 'C:\\Users\\Hp\\.gemini\\antigravity-ide\\brain\\3fcd7b80-2265-49ae-b4d0-a68e4c0abc75\\.user_uploaded\\media_1790696785020.jpg';
if (fs.existsSync(logoSource)) {
  fs.copyFileSync(logoSource, path.join(__dirname, 'public', 'logo.png'));
  fs.copyFileSync(logoSource, path.join(__dirname, 'public', 'the-yarn-basket-logo.png'));
  console.log('Logo copied successfully to public/logo.png and public/the-yarn-basket-logo.png');
}

console.log('Done copying all assets.');
