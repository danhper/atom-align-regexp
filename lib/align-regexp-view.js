'use babel';

import { CompositeDisposable } from 'atom';
import EventEmitter            from 'events';

const MAX_HISTORY_SIZE = 10;

export default class AlignRegexpView extends EventEmitter {
  constructor(serializedHistory) {
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
    this.subscriptions.add(
      atom.commands.add(this.editorElement, 'core:move-up', () => this.historyPrevious()));
    this.subscriptions.add(
      atom.commands.add(this.editorElement, 'core:move-down', () => this.historyNext()));

    this.element.appendChild(this.editorElement);

    this.history = serializedHistory || [''];
    this.historyIndex = 0;
  }

  execute() {
    this.emit('align', this.editorElement.getModel().getText());
    this.reset();
  }

  cancel() {
    this.emit('cancel');
    this.reset();
  }

  reset() {
    this.historyIndex = 0;
    this.editorElement.getModel().setText('');
  }

  serialize() {
    return {
      history: this.history
    };
  }

  destroy() {
    this.element.remove();
    this.subscriptions.dispose();
  }

  historyNext() {
    this.selectHistoryItem(this.historyIndex - 1);
  }

  historyPrevious() {
    this.selectHistoryItem(this.historyIndex + 1);
  }

  selectHistoryItem(index) {
    const historySize = this.history.length;
    this.historyIndex = (index + historySize) % historySize;
    this.editorElement.getModel().setText(this.history[this.historyIndex]);
  }

  getEditorElement() {
    return this.editorElement;
  }

  addToHistory(regexp) {
    const index = this.history.indexOf(regexp);
    if (index > -1) {
      this.history.splice(index, 1);
    }
    this.history.splice(1, 0, regexp);
    if (this.history.length > MAX_HISTORY_SIZE) {
      this.history.splice(MAX_HISTORY_SIZE, this.history.length - MAX_HISTORY_SIZE + 1);
    }
  }
}
