'use babel';

import { CompositeDisposable } from 'atom';
import EventEmitter            from 'events';

export default class AlignRegexpView extends EventEmitter {
  constructor(serializedState) {
    super();
    this.subscriptions = new CompositeDisposable();
    this.element       = document.createElement('div');
    this.editorElement = document.createElement('atom-text-editor');

    this.editorElement.classList.add('align-regexp');
    this.editorElement.classList.add('editor');
    this.editorElement.getModel().setMini(true);
    this.editorElement.setAttribute('mini', '');

    this.subscriptions.add(
      atom.commands.add(this.editorElement, 'core:confirm', () => this.execute()));
    this.subscriptions.add(
      atom.commands.add(this.editorElement, 'core:cancel', () => this.cancel()));

    this.element.appendChild(this.editorElement);
  }

  execute() {
    this.emit('align', this.editorElement.getModel().getText());
    this.editorElement.getModel().setText('');
  }

  cancel() {
    this.emit('cancel');
    this.editorElement.getModel().setText('');
  }

  serialize() {}

  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  getElement() {
    return this.element;
  }

  getEditorElement() {
    return this.editorElement;
  }
}
