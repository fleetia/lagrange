import assert from 'node:assert/strict';

import { Window } from 'happy-dom';

const window = new Window({ url: 'http://localhost' });

globalThis.window = window;
globalThis.document = window.document;
globalThis.HTMLElement = window.HTMLElement;
globalThis.HTMLDialogElement = window.HTMLDialogElement;
globalThis.Node = window.Node;
globalThis.Event = window.Event;
globalThis.MouseEvent = window.MouseEvent;
globalThis.getComputedStyle = window.getComputedStyle.bind(window);
Object.defineProperty(globalThis, 'navigator', {
  configurable: true,
  value: window.navigator,
});

window.HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '');
};

window.HTMLDialogElement.prototype.close = function () {
  this.removeAttribute('open');
  window.setTimeout(() => this.dispatchEvent(new window.Event('close')), 0);
};

const [{ default: React, StrictMode }, { createRoot }, { Dialog, IconTile }] =
  await Promise.all([
    import('react'),
    import('react-dom/client'),
    import('@fleetia/lagrange'),
  ]);
const container = window.document.createElement('div');
const openChanges = [];
const tileRef = React.createRef();
let tileActivations = 0;
window.document.body.append(container);

const root = createRoot(container);
root.render(
  React.createElement(
    StrictMode,
    null,
    React.createElement(
      Dialog,
      {
        isOpen: true,
        onOpenChange: (isOpen) => openChanges.push(isOpen),
        title: 'React 18 dialog',
      },
      'Dialog content',
    ),
    React.createElement(IconTile, {
      icon: React.createElement('span', { 'aria-hidden': true }, '☆'),
      label: 'React 18 icon tile',
      onClick: () => {
        tileActivations += 1;
      },
      ref: tileRef,
    }),
  ),
);

await new Promise((resolve) => window.setTimeout(resolve, 50));

assert.deepEqual(openChanges, []);
assert.equal(window.document.querySelector('dialog')?.open, true);
assert.equal(tileRef.current?.tagName, 'BUTTON');
assert.equal(tileRef.current?.type, 'button');
assert.equal(
  tileRef.current?.querySelector('[data-lagrange-part="icon-tile-label"]')
    ?.textContent,
  'React 18 icon tile',
);
tileRef.current.click();
assert.equal(tileActivations, 1);

root.unmount();
window.close();
