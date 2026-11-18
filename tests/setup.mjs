// Lets Node resolve the same bare import ("cannon-es") the browser import map uses.
import { register } from 'node:module';
const cannonUrl = new URL('../lib/cannon-es/cannon-es.js', import.meta.url).href;
register('data:text/javascript,' + encodeURIComponent(
  `export async function resolve(s, c, n) { if (s === 'cannon-es') return { url: ${JSON.stringify(cannonUrl)}, shortCircuit: true }; return n(s, c); }`
));
