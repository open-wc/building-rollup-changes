import { LitElement, html, css } from 'lit-element';
import './a/b/import-meta-test-2.js';
import './demo-component.js';

// partial css trips up the minifier
const fontSize = css`
  16
`;

const fontMd = css`
  font-size: ${fontSize}px;
`;

class DemoApp extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        color: black;
        background-color: white;
        ${fontMd}
      }
    `;
  }

  render() {
    return html`
      <p>Demo app</p>
      <demo-component></demo-component>
      <lazy-component></lazy-component>
    `;
  }
}

customElements.define('demo-app', DemoApp);

const stylesToBeMinified = css`
  .foo {
    color: 16px;
  }
`;

const partialCSS = DemoApp.styles.cssText.replace(/\s/g, '');
const foo = { bar: 'lorem ipsum' };
const loremIpsum = undefined;

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

window.__startsWith = 'foo'.startsWith('fo');
window.__map = new Map().set('foo', 'bar').get('foo') === 'bar';
window.__importMeta =
  import.meta.url.startsWith(window.location.origin) && import.meta.url.endsWith('demo-app.js');
window.__asyncFunction = asyncFunction();
window.__forOf = forOf() === 3;
window.__optionalChaining = foo?.bar === 'lorem ipsum' && foo?.bar?.loremIpsum === undefined;
window.__nullishCoalescing = (loremIpsum ?? 'lorem ipsum') === 'lorem ipsum';
console.log(partialCSS.cssText);
window.__partialCSS = partialCSS.includes('font-size:16px') && partialCSS.includes('display:block');
window.__minifiedCSS = stylesToBeMinified.cssText === '';
window.__litElement = (async () => {
  await import('./lazy-component.js');
  const app = document.body.querySelector('demo-app');
  const demoComponent = app.shadowRoot.querySelector('demo-component');
  const lazyComponent = app.shadowRoot.querySelector('lazy-component');

  return (
    app.shadowRoot.innerHTML.includes('<p>Demo app</p>') &&
    demoComponent.shadowRoot.innerHTML.includes('<p>Demo component</p>') &&
    lazyComponent.shadowRoot.innerHTML.includes('<p>Lazy component</p>')
  );
})();