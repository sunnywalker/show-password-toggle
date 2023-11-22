/*!
 * ShowPasswordToggle.js
 * Vanilla JavaScript web component for adding a show/hide checkbox toggle to display/hide password field contents.
 *
 * @version 2023-11-22
 * @author Sunny Walker, swalker@hawaii.edu, University of Hawaiʻi at Hilo, http://hilo.hawaii.edu/
 * @license GNU LGPL
 */
class ShowPasswordToggle extends HTMLElement {
  bindInput() {
    if (this.min) {
      this.el.addEventListener('input', ev => this.updateStatus());
    }
  }

  buildPie(pct) {
    pct = Math.min(1, Math.max(0, pct)); // ensure 0 <= pct <= 1
    const x = Math.cos(2 * Math.PI * pct);
    const y = Math.sin(2 * Math.PI * pct);
    const pie = pct > 0 && pct < 1 ? `<path d="M1 0A1 1 0 ${pct > 0.5 ? 1 : 0} 1 ${x} ${y}L0 0" class="show-password-toggle-svg-fg" fill="#900" transform="rotate(-90)"/>` : '';
    return `<svg width="1em" height="1em" class="show-password-toggle-svg" viewBox="-1 -1 2 2" aria-hidden="true"><circle r="1" cx="0" cy="0" class="show-password-toggle-svg-bg${pct >= 1 ? ' is-valid' : ''}" fill="${pct < 1 ? '#ccc' : '#090'}"/>${pie}</svg>`;
  }

  constructor() {
      super();
      // find the first type=password element
      this.el = this.querySelector('input[type="password"]');
      // short circuit if there's no type=password found
      if (!this.el) {
        return;
      }
      // if the element has a custom label="…", use that instead of 'Show password'
      this.label = this.getAttribute('label') ?? 'Show password';
      // add a class to the label, if specified
      this.label_class = this.hasAttribute('label-class') ? ` class="${this.getAttribute('label-class')}"` : '';
      // add a lang to the label, if specified
      this.lang = this.hasAttribute('lang') ? ` lang="${this.getAttribute('lang')}"` : '';
      // if min-length="[>0]", then show a status
      this.min_length = parseInt(this.getAttribute('min-length') ?? '0', 10);
      this.min_length_label = this.getAttribute('min-length-label') ?? 'At least ### characters';
  }

  connectedCallback() {
    // start with a span.show-password-toggle
    const wrapper = document.createElement('span');
    wrapper.classList.add('show-password-toggle');
    wrapper.innerHTML = `<label${this.label_class}${this.lang}><input type="checkbox">${this.label}</label>`;
    // show a pie chart if min-length
    if (this.min_length > 0) {
      wrapper.insertAdjacentHTML('beforeend', `<span class="min-length"></span>`);
      this.min = wrapper.querySelector('.min-length');
    }
    // add directly following the input
    this.el.after(wrapper);
    const toggle = wrapper.querySelector('input');
    // add toggle behavior
    toggle.addEventListener('change', ev => {
      const field = document.createElement('input');
      field.type = ev.target.checked ? 'text' : 'password';
      // copy all the attributes
      [...this.el.attributes].forEach(attr => {
        if (attr.name.toLowerCase() !== 'type') {
          field.setAttribute(attr.name, attr.value);
        }
      });
      // copy the value
      field.value = this.el.value;
      // add the new element and remove the old one
      this.el.before(field);
      this.el.remove();
      this.el = field;
      this.bindInput();
    });
    // show the min length status if needed
    this.updateStatus();
    // add the input binding if needed
    this.bindInput();
  }

  updateStatus() {
    if (this.min) {
      this.min.innerHTML = `${this.buildPie(this.el.value.length / this.min_length)} ${this.min_length_label.replace(/###/g, this.min_length)}`;
    }
  }
}

// register the new component
if ("customElements" in window) {
  window.customElements.define("show-password-toggle", ShowPasswordToggle);
}

export { ShowPasswordToggle };
