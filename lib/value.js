export default function value(element) {
  if (element.hasAttribute('data-value')) {
    return element.getAttribute('data-value');
  }

  return element.innerText.trim() || element.textContent.trim() || '';
}
