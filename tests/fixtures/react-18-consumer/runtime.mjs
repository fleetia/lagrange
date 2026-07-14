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

const [{ default: React, StrictMode }, { createRoot }, { Dialog }] =
  await Promise.all([
    import('react'),
    import('react-dom/client'),
    import('@fleetia/lagrange'),
  ]);
const container = window.document.createElement('div');
const openChanges = [];
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
  ),
);

await new Promise((resolve) => window.setTimeout(resolve, 50));

assert.deepEqual(openChanges, []);
assert.equal(window.document.querySelector('dialog')?.open, true);

root.unmount();
window.close();
