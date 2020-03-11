let _ = t => t,
    _t;

const importMeta = {
  url: new URL('./demo/js/a/b/import-meta-test-2.js', import.meta.url).href
};
window.__importMeta2 = importMeta.url.startsWith(window.location.origin) && importMeta.url.endsWith('/a/b/import-meta-test-2.js');
const importMeta$1 = {
  url: new URL('./demo/js/syntax.js', import.meta.url).href
};
setTimeout(() => {
  import('./lazy-db53fdd6.js');
}, 1000);

function html() {}

class Foo {
  bar() {
    return 'x';
  }

}

const myTemplate = html(_t || (_t = _`
  foo bar
`));
console.log(Foo);
console.log(myTemplate);

async function asyncFunction() {
  await new Promise(resolve => setTimeout(resolve, 1));
  return true;
}

function forOf() {
  const map = new Map();
  map.set('a', 1);
  map.set('2', 2);
  let total = 0;

  for (const [k, v] of map) {
    total += v;
  }

  return total;
}

console.log('async function compiled to: ', asyncFunction.toString());
console.log('forOf function compiled to: ', forOf.toString());
window.__startsWith = 'foo'.startsWith('fo');
window.__map = new Map().set('foo', 'bar').get('foo') === 'bar';
window.__importMeta = importMeta$1.url.startsWith(window.location.origin) && importMeta$1.url.endsWith('syntax.js');
window.__asyncFunction = asyncFunction();
window.__forOf = forOf() === 3;
