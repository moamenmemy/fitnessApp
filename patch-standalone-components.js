const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'fitness-app', 'src', 'app');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap(d => d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]).filter(f => f.endsWith('.ts'));
const files = walk(root);
const modified = [];
for (const file of files) {
  if (file.endsWith('.spec.ts')) continue;
  let text = fs.readFileSync(file, 'utf8');
  if (!text.includes('@Component({')) continue;
  let changed = false;
  if (text.includes('imports:') && !/standalone\s*:\s*true/.test(text)) {
    text = text.replace('@Component({', '@Component({\n  standalone: true,');
    changed = true;
  }
  if (text.includes('styleUrl:')) {
    text = text.replace(/styleUrl\s*:\s*(['"])(.*?)\1/g, 'styleUrls: ["$2"]');
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, text, 'utf8');
    modified.push(file);
  }
}
console.log('Modified', modified.length, 'files');
modified.forEach(f => console.log(f));
