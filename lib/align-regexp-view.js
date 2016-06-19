'use babel';

import { CompositeDisposable } from 'atom';
import EventEmitter            from 'events';

export default class AlignRegexpView extends EventEmitter {
  constructor(serializedState) {
    super();
    this.subscriptions = new CompositeDisposable();
    this.element       = document.createElement('atom-text-editor');

    this.element.classList.add('align-regexp');
    this.element.classList.add('editor');
    this.element.getModel().setMini(true);
    this.element.setAttribute('mini', '');

    this.subscriptions.add(atom.commands.add(this.element, 'core:confirm', () => this.execute()));
    this.subscriptions.add(atom.commands.add(this.element, 'core:cancel', () => this.cancel()));
    this.subscriptions.add(atom.commands.add(this.element, 'blur', () => this.cancel()));
  }

  execute() {
    this.emit('align', this.element.getModel().getText());
    this.element.getModel().setText('');
  }

  cancel() {
    this.emit('cancel');
    this.element.getModel().setText('');
  }

  serialize() {}

  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getElement() {
    return this.element;
  }
}
