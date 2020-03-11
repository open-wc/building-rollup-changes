let _ = t => t,
    _t;

const importMeta = {
  url: new URL('./demo/js/lazy.js', import.meta.url).href
};
console.log('lazy loaded');

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
window.__importMeta = importMeta.url.startsWith(window.location.origin) && importMeta.url.endsWith('syntax.js');
window.__asyncFunction = asyncFunction();
window.__forOf = forOf() === 3;
