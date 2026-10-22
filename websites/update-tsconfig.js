const fs = require('fs');
const path = require('path');
const root = 'C:\Users\HP\source\repos\Anas379110\Software\Webwebsites\anasnet-program\sites';
const strictPath = path.join(root, '..', '..', '..', '..', 'node_modules', 'astro', 'tsconfigs', 'strict.json');
const strictContent = fs.readFileSync(strictPath, 'utf8');
const files = fs.readdirSync(root, { withFileTypes: true })
  .filter(d=>d.isDirectory())
  .map(d=>path.join(root, d.name, 'tsconfig.json'));
files.forEach(fp=>{
  fs.writeFileSync(fp, strictContent, 'utf8');
  console.log('Updated', fp);
});
