import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
const ignored = new Set(['node_modules', 'dist', '.git']);
async function javascriptFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, {withFileTypes:true});
  const nested = await Promise.all(entries.filter(entry=>!ignored.has(entry.name)).map(entry=>entry.isDirectory() ? javascriptFiles(join(directory,entry.name)) : /\.(?:[cm]?js|jsx)$/i.test(entry.name) ? [join(directory,entry.name)] : []));
  return nested.flat();
}
const files = await javascriptFiles(process.cwd());
if (files.length) { console.error('JavaScript source files are not allowed:\n'+files.join('\n')); process.exitCode=1; }
else console.log('TypeScript-only source check passed.');
