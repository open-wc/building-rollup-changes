import {LitElement, html} from 'lit-element';

class MyApp extends LitElement {
  render() {
    return html`I'm an app`;
  }
}

customElements.define('my-app', MyApp);