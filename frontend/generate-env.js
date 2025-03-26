const fs = require('fs');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(fs.readFileSync('.env'));

const envObject = Object.entries(envConfig)
  .map(([key, value]) => `  ${key}: "${value}"`)
  .join(',\n');

const content = `window.__env__ = {\n${envObject}\n};\n`;

fs.writeFileSync('./src/assets/env.js', content);
console.log('✅ env.js generato con successo!');