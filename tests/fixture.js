import { queryAll } from '../lib/utils/select';

export default class Fixture {
  create(markup) {
    this.element = document.createElement('div');
    this.element.id = 'fixture';
    this.element.innerHTML = markup;
    document.body.appendChild(this.element);
  }

  destroy() {
    if (this.element) {
      document.body.removeChild(this.element);
      this.element = null;
    }
  }

  cleanUp() {
    queryAll('[aria-live="assertive"]').forEach((el) =>
      el.parentNode.removeChild(el)
    );
  }
}
