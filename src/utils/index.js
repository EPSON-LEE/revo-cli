import { readFile } from 'fs/promises';

async function loadJSONFile(filePath) {
  const data = await readFile(filePath, 'utf8');
  return JSON.parse(data);
}

export {
  loadJSONFile
}