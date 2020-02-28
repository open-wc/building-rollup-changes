System.register(["./_rollupPluginBabelHelpers-ecf5a944.js"],(function(){"use strict";var e,t,n,i,r,a,s,o,u,l,h;return{setters:[function(c){e=c._,t=c.a,n=c.b,i=c.c,r=c.d,a=c.e,s=c.f,o=c.g,u=c.h,l=c.i,h=c.j}],execute:function(){
/**
             * @license
             * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
             * This code may only be used under the BSD style license found at
             * http://polymer.github.io/LICENSE.txt
             * The complete set of authors may be found at
             * http://polymer.github.io/AUTHORS.txt
             * The complete set of contributors may be found at
             * http://polymer.github.io/CONTRIBUTORS.txt
             * Code distributed by Google as part of the polymer project is also
             * subject to an additional IP rights grant found at
             * http://polymer.github.io/PATENTS.txt
             */
var c=new WeakMap,d=function(e){return"function"==typeof e&&c.has(e)},p=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,v=function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;t!==n;){var i=t.nextSibling;e.removeChild(t),t=i}},f={},y={},_="{{lit-".concat(String(Math.random()).slice(2),"}}"),m="\x3c!--".concat(_,"--\x3e"),g=new RegExp("".concat(_,"|").concat(m)),S=function t(n,i){e(this,t),this.parts=[],this.element=i;for(var r=[],a=[],s=document.createTreeWalker(i.content,133,null,!1),o=0,u=-1,l=0,h=n.strings,c=n.values.length;l<c;){var d=s.nextNode();if(null!==d){if(u++,1===d.nodeType){if(d.hasAttributes()){for(var p=d.attributes,v=p.length,f=0,y=0;y<v;y++)w(p[y].name,"$lit$")&&f++;for(;f-- >0;){var m=h[l],S=x.exec(m)[2],k=S.toLowerCase()+"$lit$",P=d.getAttribute(k);d.removeAttribute(k);var N=P.split(g);this.parts.push({type:"attribute",index:u,name:S,strings:N}),l+=N.length-1}}"TEMPLATE"===d.tagName&&(a.push(d),s.currentNode=d.content)}else if(3===d.nodeType){var C=d.data;if(C.indexOf(_)>=0){for(var A=d.parentNode,E=C.split(g),T=E.length-1,V=0;V<T;V++){var O=void 0,R=E[V];if(""===R)O=b();else{var U=x.exec(R);null!==U&&w(U[2],"$lit$")&&(R=R.slice(0,U.index)+U[1]+U[2].slice(0,-"$lit$".length)+U[3]),O=document.createTextNode(R)}A.insertBefore(O,d),this.parts.push({type:"node",index:++u})}""===E[T]?(A.insertBefore(b(),d),r.push(d)):d.data=E[T],l+=T}}else if(8===d.nodeType)if(d.data===_){var M=d.parentNode;null!==d.previousSibling&&u!==o||(u++,M.insertBefore(b(),d)),o=u,this.parts.push({type:"node",index:u}),null===d.nextSibling?d.data="":(r.push(d),u--),l++}else for(var j=-1;-1!==(j=d.data.indexOf(_,j+1));)this.parts.push({type:"node",index:-1}),l++}else s.currentNode=a.pop()}for(var q=0,z=r;q<z.length;q++){var F=z[q];F.parentNode.removeChild(F)}},w=function(e,t){var n=e.length-t.length;return n>=0&&e.slice(n)===t},k=function(e){return-1!==e.index},b=function(){return document.createComment("")},x=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,P=function(){function i(t,n,r){e(this,i),this.__parts=[],this.template=t,this.processor=n,this.options=r}return t(i,[{key:"update",value:function(e){var t=0,n=!0,i=!1,r=void 0;try{for(var a,s=this.__parts[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var o=a.value;void 0!==o&&o.setValue(e[t]),t++}}catch(e){i=!0,r=e}finally{try{n||null==s.return||s.return()}finally{if(i)throw r}}var u=!0,l=!1,h=void 0;try{for(var c,d=this.__parts[Symbol.iterator]();!(u=(c=d.next()).done);u=!0){var p=c.value;void 0!==p&&p.commit()}}catch(e){l=!0,h=e}finally{try{u||null==d.return||d.return()}finally{if(l)throw h}}}},{key:"_clone",value:function(){for(var e,t=p?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],r=this.template.parts,a=document.createTreeWalker(t,133,null,!1),s=0,o=0,u=a.nextNode();s<r.length;)if(e=r[s],k(e)){for(;o<e.index;)o++,"TEMPLATE"===u.nodeName&&(i.push(u),a.currentNode=u.content),null===(u=a.nextNode())&&(a.currentNode=i.pop(),u=a.nextNode());if("node"===e.type){var l=this.processor.handleTextExpression(this.options);l.insertAfterNode(u.previousSibling),this.__parts.push(l)}else{var h;(h=this.__parts).push.apply(h,n(this.processor.handleAttributeExpressions(u,e.name,e.strings,this.options)))}s++}else this.__parts.push(void 0),s++;return p&&(document.adoptNode(t),customElements.upgrade(t)),t}}]),i}(),N=" ".concat(_," "),C=function(){function n(t,i,r,a){e(this,n),this.strings=t,this.values=i,this.type=r,this.processor=a}return t(n,[{key:"getHTML",value:function(){for(var e=this.strings.length-1,t="",n=!1,i=0;i<e;i++){var r=this.strings[i],a=r.lastIndexOf("\x3c!--");n=(a>-1||n)&&-1===r.indexOf("--\x3e",a+1);var s=x.exec(r);t+=null===s?r+(n?N:m):r.substr(0,s.index)+s[1]+s[2]+"$lit$"+s[3]+_}return t+=this.strings[e]}},{key:"getTemplateElement",value:function(){var e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}]),n}(),A=function(e){return null===e||!("object"===i(e)||"function"==typeof e)},E=function(e){return Array.isArray(e)||!(!e||!e[Symbol.iterator])},T=function(){function n(t,i,r){e(this,n),this.dirty=!0,this.element=t,this.name=i,this.strings=r,this.parts=[];for(var a=0;a<r.length-1;a++)this.parts[a]=this._createPart()}return t(n,[{key:"_createPart",value:function(){return new V(this)}},{key:"_getValue",value:function(){for(var e=this.strings,t=e.length-1,n="",i=0;i<t;i++){n+=e[i];var r=this.parts[i];if(void 0!==r){var a=r.value;if(A(a)||!E(a))n+="string"==typeof a?a:String(a);else{var s=!0,o=!1,u=void 0;try{for(var l,h=a[Symbol.iterator]();!(s=(l=h.next()).done);s=!0){var c=l.value;n+="string"==typeof c?c:String(c)}}catch(e){o=!0,u=e}finally{try{s||null==h.return||h.return()}finally{if(o)throw u}}}}}return n+=e[t]}},{key:"commit",value:function(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}]),n}(),V=function(){function n(t){e(this,n),this.value=void 0,this.committer=t}return t(n,[{key:"setValue",value:function(e){e===f||A(e)&&e===this.value||(this.value=e,d(e)||(this.committer.dirty=!0))}},{key:"commit",value:function(){for(;d(this.value);){var e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}]),n}(),O=function(){function n(t){e(this,n),this.value=void 0,this.__pendingValue=void 0,this.options=t}return t(n,[{key:"appendInto",value:function(e){this.startNode=e.appendChild(b()),this.endNode=e.appendChild(b())}},{key:"insertAfterNode",value:function(e){this.startNode=e,this.endNode=e.nextSibling}},{key:"appendIntoPart",value:function(e){e.__insert(this.startNode=b()),e.__insert(this.endNode=b())}},{key:"insertAfterPart",value:function(e){e.__insert(this.startNode=b()),this.endNode=e.endNode,e.endNode=this.startNode}},{key:"setValue",value:function(e){this.__pendingValue=e}},{key:"commit",value:function(){for(;d(this.__pendingValue);){var e=this.__pendingValue;this.__pendingValue=f,e(this)}var t=this.__pendingValue;t!==f&&(A(t)?t!==this.value&&this.__commitText(t):t instanceof C?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):E(t)?this.__commitIterable(t):t===y?(this.value=y,this.clear()):this.__commitText(t))}},{key:"__insert",value:function(e){this.endNode.parentNode.insertBefore(e,this.endNode)}},{key:"__commitNode",value:function(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}},{key:"__commitText",value:function(e){var t=this.startNode.nextSibling,n="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}},{key:"__commitTemplateResult",value:function(e){var t=this.options.templateFactory(e);if(this.value instanceof P&&this.value.template===t)this.value.update(e.values);else{var n=new P(t,e.processor,this.options),i=n._clone();n.update(e.values),this.__commitNode(i),this.value=n}}},{key:"__commitIterable",value:function(e){Array.isArray(this.value)||(this.value=[],this.clear());var t,i=this.value,r=0,a=!0,s=!1,o=void 0;try{for(var u,l=e[Symbol.iterator]();!(a=(u=l.next()).done);a=!0){var h=u.value;void 0===(t=i[r])&&(t=new n(this.options),i.push(t),0===r?t.appendIntoPart(this):t.insertAfterPart(i[r-1])),t.setValue(h),t.commit(),r++}}catch(e){s=!0,o=e}finally{try{a||null==l.return||l.return()}finally{if(s)throw o}}r<i.length&&(i.length=r,this.clear(t&&t.endNode))}},{key:"clear",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.startNode;v(this.startNode.parentNode,e.nextSibling,this.endNode)}}]),n}(),R=function(){function n(t,i,r){if(e(this,n),this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=i,this.strings=r}return t(n,[{key:"setValue",value:function(e){this.__pendingValue=e}},{key:"commit",value:function(){for(;d(this.__pendingValue);){var e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue!==f){var t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=f}}}]),n}(),U=function(n){function i(t,n,r){var o;return e(this,i),(o=a(this,s(i).call(this,t,n,r))).single=2===r.length&&""===r[0]&&""===r[1],o}return r(i,n),t(i,[{key:"_createPart",value:function(){return new M(this)}},{key:"_getValue",value:function(){return this.single?this.parts[0].value:o(s(i.prototype),"_getValue",this).call(this)}},{key:"commit",value:function(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}]),i}(T),M=function(t){function n(){return e(this,n),a(this,s(n).apply(this,arguments))}return r(n,t),n}(V),j=!1;try{var q={get capture(){return j=!0,!1}};window.addEventListener("test",q,q),window.removeEventListener("test",q,q)}catch(e){}var z=function(){function n(t,i,r){var a=this;e(this,n),this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=i,this.eventContext=r,this.__boundHandleEvent=function(e){return a.handleEvent(e)}}return t(n,[{key:"setValue",value:function(e){this.__pendingValue=e}},{key:"commit",value:function(){for(;d(this.__pendingValue);){var e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue!==f){var t=this.__pendingValue,n=this.value,i=null==t||null!=n&&(t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive),r=null!=t&&(null==n||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=F(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=f}}},{key:"handleEvent",value:function(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}]),n}(),F=function(e){return e&&(j?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)},I=new(function(){function n(){e(this,n)}return t(n,[{key:"handleAttributeExpressions",value:function(e,t,n,i){var r=t[0];return"."===r?new U(e,t.slice(1),n).parts:"@"===r?[new z(e,t.slice(1),i.eventContext)]:"?"===r?[new R(e,t.slice(1),n)]:new T(e,t,n).parts}},{key:"handleTextExpression",value:function(e){return new O(e)}}]),n}());
/**
             * @license
             * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
             * This code may only be used under the BSD style license found at
             * http://polymer.github.io/LICENSE.txt
             * The complete set of authors may be found at
             * http://polymer.github.io/AUTHORS.txt
             * The complete set of contributors may be found at
             * http://polymer.github.io/CONTRIBUTORS.txt
             * Code distributed by Google as part of the polymer project is also
             * subject to an additional IP rights grant found at
             * http://polymer.github.io/PATENTS.txt
             */
function B(e){var t=H.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},H.set(e.type,t));var n=t.stringsArray.get(e.strings);if(void 0!==n)return n;var i=e.strings.join(_);return void 0===(n=t.keyString.get(i))&&(n=new S(e,e.getTemplateElement()),t.keyString.set(i,n)),t.stringsArray.set(e.strings,n),n}var H=new Map,L=new WeakMap;
/**
             * @license
             * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
             * This code may only be used under the BSD style license found at
             * http://polymer.github.io/LICENSE.txt
             * The complete set of authors may be found at
             * http://polymer.github.io/AUTHORS.txt
             * The complete set of contributors may be found at
             * http://polymer.github.io/CONTRIBUTORS.txt
             * Code distributed by Google as part of the polymer project is also
             * subject to an additional IP rights grant found at
             * http://polymer.github.io/PATENTS.txt
             */
/**
             * @license
             * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
             * This code may only be used under the BSD style license found at
             * http://polymer.github.io/LICENSE.txt
             * The complete set of authors may be found at
             * http://polymer.github.io/AUTHORS.txt
             * The complete set of contributors may be found at
             * http://polymer.github.io/CONTRIBUTORS.txt
             * Code distributed by Google as part of the polymer project is also
             * subject to an additional IP rights grant found at
             * http://polymer.github.io/PATENTS.txt
             */
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");function $(e,t){for(var n=e.element.content,i=e.parts,r=document.createTreeWalker(n,133,null,!1),a=J(i),s=i[a],o=-1,u=0,l=[],h=null;r.nextNode();){o++;var c=r.currentNode;for(c.previousSibling===h&&(h=null),t.has(c)&&(l.push(c),null===h&&(h=c)),null!==h&&u++;void 0!==s&&s.index===o;)s.index=null!==h?-1:s.index-u,s=i[a=J(i,a)]}l.forEach((function(e){return e.parentNode.removeChild(e)}))}var W=function(e){for(var t=11===e.nodeType?0:1,n=document.createTreeWalker(e,133,null,!1);n.nextNode();)t++;return t},J=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1,n=t+1;n<e.length;n++){var i=e[n];if(k(i))return n}return-1};var D=function(e,t){return"".concat(e,"--").concat(t)},G=!0;void 0===window.ShadyCSS?G=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),G=!1);var K=function(e){return function(t){var n=D(t.type,e),i=H.get(n);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},H.set(n,i));var r=i.stringsArray.get(t.strings);if(void 0!==r)return r;var a=t.strings.join(_);if(void 0===(r=i.keyString.get(a))){var s=t.getTemplateElement();G&&window.ShadyCSS.prepareTemplateDom(s,e),r=new S(t,s),i.keyString.set(a,r)}return i.stringsArray.set(t.strings,r),r}},Q=["html","svg"],X=new Set,Y=function(e,t,n){X.add(e);var i=n?n.element:document.createElement("template"),r=t.querySelectorAll("style"),a=r.length;if(0!==a){for(var s=document.createElement("style"),o=0;o<a;o++){var u=r[o];u.parentNode.removeChild(u),s.textContent+=u.textContent}!function(e){Q.forEach((function(t){var n=H.get(D(t,e));void 0!==n&&n.keyString.forEach((function(e){var t=e.element.content,n=new Set;Array.from(t.querySelectorAll("style")).forEach((function(e){n.add(e)})),$(e,n)}))}))}(e);var l=i.content;n?function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=e.element.content,r=e.parts;if(null!=n)for(var a=document.createTreeWalker(i,133,null,!1),s=J(r),o=0,u=-1;a.nextNode();){u++;var l=a.currentNode;for(l===n&&(o=W(t),n.parentNode.insertBefore(t,n));-1!==s&&r[s].index===u;){if(o>0){for(;-1!==s;)r[s].index+=o,s=J(r,s);return}s=J(r,s)}}else i.appendChild(t)}(n,s,l.firstChild):l.insertBefore(s,l.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);var h=l.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==h)t.insertBefore(h.cloneNode(!0),t.firstChild);else if(n){l.insertBefore(s,l.firstChild);var c=new Set;c.add(s),$(n,c)}}else window.ShadyCSS.prepareTemplateStyles(i,e)};window.JSCompiler_renameProperty=function(e,t){return e};var Z={toAttribute:function(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute:function(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},ee=function(e,t){return t!==e&&(t==t||e==e)},te={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:ee},ne=Promise.resolve(!0),ie=function(o){function u(){var t;return e(this,u),(t=a(this,s(u).call(this)))._updateState=0,t._instanceProperties=void 0,t._updatePromise=ne,t._hasConnectedResolver=void 0,t._changedProperties=new Map,t._reflectingProperties=void 0,t.initialize(),t}var h;return r(u,o),t(u,[{key:"initialize",value:function(){this._saveInstanceProperties(),this._requestUpdate()}},{key:"_saveInstanceProperties",value:function(){var e=this;this.constructor._classProperties.forEach((function(t,n){if(e.hasOwnProperty(n)){var i=e[n];delete e[n],e._instanceProperties||(e._instanceProperties=new Map),e._instanceProperties.set(n,i)}}))}},{key:"_applyInstanceProperties",value:function(){var e=this;this._instanceProperties.forEach((function(t,n){return e[n]=t})),this._instanceProperties=void 0}},{key:"connectedCallback",value:function(){this._updateState=32|this._updateState,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}},{key:"disconnectedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(e,t,n){t!==n&&this._attributeToProperty(e,n)}},{key:"_propertyToAttribute",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:te,i=this.constructor,r=i._attributeNameForProperty(e,n);if(void 0!==r){var a=i._propertyValueToAttribute(t,n);if(void 0===a)return;this._updateState=8|this._updateState,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._updateState=-9&this._updateState}}},{key:"_attributeToProperty",value:function(e,t){if(!(8&this._updateState)){var n=this.constructor,i=n._attributeToPropertyMap.get(e);if(void 0!==i){var r=n._classProperties.get(i)||te;this._updateState=16|this._updateState,this[i]=n._propertyValueFromAttribute(t,r),this._updateState=-17&this._updateState}}}},{key:"_requestUpdate",value:function(e,t){var n=!0;if(void 0!==e){var i=this.constructor,r=i._classProperties.get(e)||te;i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):n=!1}!this._hasRequestedUpdate&&n&&this._enqueueUpdate()}},{key:"requestUpdate",value:function(e,t){return this._requestUpdate(e,t),this.updateComplete}},{key:"_enqueueUpdate",value:(h=l(regeneratorRuntime.mark((function e(){var t,n,i,r,a=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this._updateState=4|this._updateState,i=this._updatePromise,this._updatePromise=new Promise((function(e,i){t=e,n=i})),e.prev=3,e.next=6,i;case 6:e.next=10;break;case 8:e.prev=8,e.t0=e.catch(3);case 10:if(this._hasConnected){e.next=13;break}return e.next=13,new Promise((function(e){return a._hasConnectedResolver=e}));case 13:if(e.prev=13,null==(r=this.performUpdate())){e.next=18;break}return e.next=18,r;case 18:e.next=23;break;case 20:e.prev=20,e.t1=e.catch(13),n(e.t1);case 23:t(!this._hasRequestedUpdate);case 24:case"end":return e.stop()}}),e,this,[[3,8],[13,20]])}))),function(){return h.apply(this,arguments)})},{key:"performUpdate",value:function(){this._instanceProperties&&this._applyInstanceProperties();var e=!1,t=this._changedProperties;try{(e=this.shouldUpdate(t))&&this.update(t)}catch(t){throw e=!1,t}finally{this._markUpdated()}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}},{key:"_markUpdated",value:function(){this._changedProperties=new Map,this._updateState=-5&this._updateState}},{key:"_getUpdateComplete",value:function(){return this._updatePromise}},{key:"shouldUpdate",value:function(e){return!0}},{key:"update",value:function(e){var t=this;void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((function(e,n){return t._propertyToAttribute(n,t[n],e)})),this._reflectingProperties=void 0)}},{key:"updated",value:function(e){}},{key:"firstUpdated",value:function(e){}},{key:"_hasConnected",get:function(){return 32&this._updateState}},{key:"_hasRequestedUpdate",get:function(){return 4&this._updateState}},{key:"hasUpdated",get:function(){return 1&this._updateState}},{key:"updateComplete",get:function(){return this._getUpdateComplete()}}],[{key:"_ensureClassProperties",value:function(){var e=this;if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;var t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((function(t,n){return e._classProperties.set(n,t)}))}}},{key:"createProperty",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:te;if(this._ensureClassProperties(),this._classProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){var n="symbol"===i(e)?Symbol():"__".concat(e);Object.defineProperty(this.prototype,e,{get:function(){return this[n]},set:function(t){var i=this[e];this[n]=t,this._requestUpdate(e,i)},configurable:!0,enumerable:!0})}}},{key:"finalize",value:function(){var e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){var t=this.properties,i=[].concat(n(Object.getOwnPropertyNames(t)),n("function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[])),r=!0,a=!1,s=void 0;try{for(var o,u=i[Symbol.iterator]();!(r=(o=u.next()).done);r=!0){var l=o.value;this.createProperty(l,t[l])}}catch(e){a=!0,s=e}finally{try{r||null==u.return||u.return()}finally{if(a)throw s}}}}},{key:"_attributeNameForProperty",value:function(e,t){var n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}},{key:"_valueHasChanged",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:ee;return n(e,t)}},{key:"_propertyValueFromAttribute",value:function(e,t){var n=t.type,i=t.converter||Z,r="function"==typeof i?i:i.fromAttribute;return r?r(e,n):e}},{key:"_propertyValueToAttribute",value:function(e,t){if(void 0!==t.reflect){var n=t.type,i=t.converter;return(i&&i.toAttribute||Z.toAttribute)(e,n)}}},{key:"observedAttributes",get:function(){var e=this;this.finalize();var t=[];return this._classProperties.forEach((function(n,i){var r=e._attributeNameForProperty(i,n);void 0!==r&&(e._attributeToPropertyMap.set(r,i),t.push(r))})),t}}]),u}(u(HTMLElement));ie.finalized=!0;
/**
            @license
            Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
            This code may only be used under the BSD style license found at
            http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
            http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
            found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
            part of the polymer project is also subject to an additional IP rights grant
            found at http://polymer.github.io/PATENTS.txt
            */
var re="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");var ae=function(e){return e.flat?e.flat(1/0):function e(t){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=0,r=t.length;i<r;i++){var a=t[i];Array.isArray(a)?e(a,n):n.push(a)}return n}(e)},se=function(n){function i(){return e(this,i),a(this,s(i).apply(this,arguments))}return r(i,n),t(i,[{key:"initialize",value:function(){o(s(i.prototype),"initialize",this).call(this),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}},{key:"createRenderRoot",value:function(){return this.attachShadow({mode:"open"})}},{key:"adoptStyles",value:function(){var e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?re?this.renderRoot.adoptedStyleSheets=e.map((function(e){return e.styleSheet})):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((function(e){return e.cssText})),this.localName))}},{key:"connectedCallback",value:function(){o(s(i.prototype),"connectedCallback",this).call(this),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}},{key:"update",value:function(e){var t=this;o(s(i.prototype),"update",this).call(this,e);var n=this.render();n instanceof C&&this.constructor.render(n,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((function(e){var n=document.createElement("style");n.textContent=e.cssText,t.renderRoot.appendChild(n)})))}},{key:"render",value:function(){}}],[{key:"finalize",value:function(){o(s(i),"finalize",this).call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}},{key:"_getUniqueStyles",value:function(){var e=this.styles,t=[];Array.isArray(e)?ae(e).reduceRight((function(e,t){return e.add(t),e}),new Set).forEach((function(e){return t.unshift(e)})):e&&t.push(e);return t}}]),i}(ie);function oe(){var e=h(["I'm an app"]);return oe=function(){return e},e}se.finalized=!0,se.render=function(e,t,n){if(!n||"object"!==i(n)||!n.scopeName)throw new Error("The `scopeName` option is required.");var r=n.scopeName,a=L.has(t),s=G&&11===t.nodeType&&!!t.host,o=s&&!X.has(r),u=o?document.createDocumentFragment():t;if(function(e,t,n){var i=L.get(t);void 0===i&&(v(t,t.firstChild),L.set(t,i=new O(Object.assign({templateFactory:B},n))),i.appendInto(t)),i.setValue(e),i.commit()}(e,u,Object.assign({templateFactory:K(r)},n)),o){var l=L.get(u);L.delete(u);var h=l.value instanceof P?l.value.template:void 0;Y(r,u,h),v(t,t.firstChild),t.appendChild(u),L.set(t,l)}!a&&s&&window.ShadyCSS.styleElement(t.host)};var ue=function(n){function i(){return e(this,i),a(this,s(i).apply(this,arguments))}return r(i,n),t(i,[{key:"render",value:function(){return function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];return new C(e,n,"html",I)}(oe())}}]),i}(se);customElements.define("my-app",ue)}}}));
//# sourceMappingURL=index-b104de95.js.map
